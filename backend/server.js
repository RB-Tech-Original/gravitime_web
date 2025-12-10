const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// In-memory session store (use Redis or database in production)
const sessions = new Map();

// Configuration
const ODOO_HOST = process.env.ODOO_HOST || 'https://ipl-pfe-2025-groupe03.odoo.com';
const ODOO_DB = process.env.ODOO_DB || 'ipl-pfe-2025-groupe03-main-26038800';
const SESSION_TIMEOUT = parseInt(process.env.SESSION_TIMEOUT) || 3600;

// Utility: Generate session token
function generateSessionToken() {
  return require('crypto').randomBytes(32).toString('hex');
}

// Utility: Validate session
function validateSession(token) {
  const session = sessions.get(token);
  if (!session) return null;

  // Check if session expired
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return null;
  }

  return session;
}

// Utility: Extend session expiry
function extendSession(token) {
  const session = sessions.get(token);
  if (session) {
    session.expiresAt = Date.now() + SESSION_TIMEOUT * 1000;
  }
}

/**
 * POST /api/auth/login
 * Authenticate user with Odoo and create a session
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      });
    }

    // Authenticate with Odoo
    const odooResponse = await axios.post(`${ODOO_HOST}/web/session/authenticate`, {
      jsonrpc: "2.0",
      method: "call",
      params: {
        db: ODOO_DB,
        login: email,
        password: password,
      },
      id: Math.floor(Date.now() / 1000),
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Check for Odoo errors
    if (odooResponse.data.error) {
      console.error('Odoo Error:', odooResponse.data.error);
      return res.status(401).json({
        error: odooResponse.data.error.data?.message || 'Authentication failed',
      });
    }

    // Validate Odoo response
    if (!odooResponse.data.result || !odooResponse.data.result.uid) {
      return res.status(401).json({
        error: 'Invalid credentials',
      });
    }

    // Create session
    const sessionToken = generateSessionToken();
    const sessionData = {
      uid: odooResponse.data.result.uid,
      email: email,
      name: odooResponse.data.result.name || '',
      username: odooResponse.data.result.username || email,
      partner_display_name: odooResponse.data.result.partner_display_name || '',
      partner_id: odooResponse.data.result.partner_id || 0,
      db: odooResponse.data.result.db || ODOO_DB,
      server_version: odooResponse.data.result.server_version || '',
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_TIMEOUT * 1000,
    };

    sessions.set(sessionToken, sessionData);

    return res.json({
      success: true,
      token: sessionToken,
      userData: {
        uid: sessionData.uid,
        email: sessionData.email,
        name: sessionData.name,
        username: sessionData.username,
        partner_display_name: sessionData.partner_display_name,
        partner_id: sessionData.partner_id,
        db: sessionData.db,
        server_version: sessionData.server_version,
      },
    });

  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({
      error: 'Server error during authentication',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * POST /api/auth/logout
 * Invalidate the session
 */
app.post('/api/auth/logout', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      sessions.delete(token);
    }

    return res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error during logout',
    });
  }
});

/**
 * GET /api/auth/verify
 * Verify if a session token is valid
 */
app.get('/api/auth/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        valid: false,
        error: 'No token provided',
      });
    }

    const session = validateSession(token);
    if (!session) {
      return res.status(401).json({
        valid: false,
        error: 'Invalid or expired token',
      });
    }

    extendSession(token);

    return res.json({
      valid: true,
      userData: {
        uid: session.uid,
        email: session.email,
        name: session.name,
        username: session.username,
        partner_display_name: session.partner_display_name,
        partner_id: session.partner_id,
        db: session.db,
        server_version: session.server_version,
      },
    });

  } catch (error) {
    console.error('Verify error:', error.message);
    return res.status(500).json({
      valid: false,
      error: 'Server error during verification',
    });
  }
});

/**
 * GET /api/download/apk
 * Download APK file (requires authentication)
 */
app.get('/api/download/apk', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        error: 'Unauthorized: No authentication token provided',
      });
    }

    // Validate session
    const session = validateSession(token);
    if (!session) {
      return res.status(401).json({
        error: 'Unauthorized: Invalid or expired token',
      });
    }

    // Extend session on successful request
    extendSession(token);

    // Build path to APK file
    const apkPath = path.join(__dirname, 'public', 'gravitime.apk');

    // Check if file exists
    if (!fs.existsSync(apkPath)) {
      return res.status(404).json({
        error: 'APK file not found',
      });
    }

    // Set appropriate headers
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', 'attachment; filename="GraviTime_v1.0.apk"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Log download
    console.log(`APK downloaded by user ${session.email} (UID: ${session.uid})`);

    // Send file
    return res.sendFile(apkPath);

  } catch (error) {
    console.error('Download error:', error.message);
    return res.status(500).json({
      error: 'Server error during file download',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  return res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

/**
 * 404 handler
 */
app.use((req, res) => {
  return res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
  });
});

/**
 * Error handler
 */
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  return res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n✅ GraviTime Backend Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 ODOO_HOST: ${ODOO_HOST}`);
  console.log(`📊 ODOO_DB: ${ODOO_DB}\n`);
});

module.exports = app;
