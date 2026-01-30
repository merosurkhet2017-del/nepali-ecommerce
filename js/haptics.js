// ============================================
// HAPTIC FEEDBACK MODULE
// Handles Web Vibration API integration
// ============================================

const HapticFeedback = {
    
    // ============================================
    // CHECK DEVICE SUPPORT
    // ============================================
    
    isSupported: function() {
        return 'vibrate' in navigator && typeof navigator.vibrate === 'function';
    },
    
    // ============================================
    // CHECK USER PREFERENCE
    // ============================================
    
    isEnabled: function() {
        const preference = localStorage.getItem('hapticsEnabled');
        // Default to true if not set
        return preference === null || preference === 'true';
    },
    
    // ============================================
    // SET USER PREFERENCE
    // ============================================
    
    setEnabled: function(enabled) {
        localStorage.setItem('hapticsEnabled', enabled);
        console.log('Haptics ' + (enabled ? 'enabled' : 'disabled'));
    },
    
    // ============================================
    // VIBRATION PATTERNS
    // Based on UX research for mobile commerce
    // ============================================
    
    patterns: {
        // Short pulse for neutral actions
        addToCart: 100,
        
        // Double pulse for removal/deletion
        removeFromCart: [30, 20, 30],
        
        // Success pattern - slightly longer
        success: [100, 50, 100],
        
        // Error pattern - triple short pulse
        error: [30, 20, 30, 20, 30],
        
        // Single long pulse for notifications
        notification: 200,
        
        // Medium pulse for confirmations
        confirm: 150
    },
    
    // ============================================
    // TRIGGER VIBRATION
    // ============================================
    
    vibrate: function(patternName) {
        // Check if supported
        if (!this.isSupported()) {
            console.log('Vibration API not supported on this device');
            return false;
        }
        
        // Check if user has enabled haptics
        if (!this.isEnabled()) {
            console.log('Haptics disabled by user preference');
            return false;
        }
        
        // Get pattern
        const pattern = this.patterns[patternName];
        
        if (!pattern) {
            console.error('Unknown haptic pattern: ' + patternName);
            return false;
        }
        
        // Trigger vibration
        try {
            navigator.vibrate(pattern);
            console.log('Vibration triggered: ' + patternName);
            return true;
        } catch (error) {
            console.error('Vibration failed:', error);
            return false;
        }
    },
    
    // ============================================
    // STOP ALL VIBRATIONS
    // ============================================
    
    stop: function() {
        if (this.isSupported()) {
            navigator.vibrate(0);
        }
    },
    
    // ============================================
    // DISPLAY STATUS TO USER
    // ============================================
    
    getStatusMessage: function() {
        if (!this.isSupported()) {
            return 'Haptic feedback not supported on this device';
        }
        if (!this.isEnabled()) {
            return 'Haptic feedback is disabled';
        }
        return 'Haptic feedback is enabled';
    }
};

// ============================================
// LOG HAPTICS STATUS ON LOAD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Haptics.js loaded');
    console.log('Device support:', HapticFeedback.isSupported());
    console.log('User enabled:', HapticFeedback.isEnabled());
});
