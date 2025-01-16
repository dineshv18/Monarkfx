export const getVerificationTemplate = (verificationLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - MonarkFX Trading Platform</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #ff0000, #cc0000);
            color: #ffffff;
            text-align: center;
            padding: 40px;
        }
        .content {
            padding: 40px;
        }
        h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
            color: #1a1a1a;
            font-size: 24px;
            margin-top: 0;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #333333;
        }
        .button {
            display: inline-block;
            padding: 15px 35px;
            background: linear-gradient(135deg, #ff0000, #cc0000);
            color: #ffffff;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
        }
        .features {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 8px;
            margin-top: 30px;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
        }
        .feature-item {
            margin-bottom: 20px;
            padding-left: 30px;
            position: relative;
        }
        .feature-item:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #ff0000;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #666666;
            background-color: #f8f8f8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to MonarkFX!</h1>
        </div>
        <div class="content">
            <h2>Begin Your Trading Journey</h2>
            <p>Dear Valued Trader,</p>
            <p>Welcome to MonarkFX, your premier platform for stock market trading and financial success. To activate your trading account and ensure security, please verify your email address:</p>
            <a href="${verificationLink}" class="button">Verify Email & Start Trading</a>
            <p>Once verified, you'll gain access to:</p>
            <div class="features">
                <div class="feature-item">
                    Real-time market analysis and trading signals
                </div>
                <div class="feature-item">
                    Advanced trading tools and indicators
                </div>
                <div class="feature-item">
                    Professional trading strategies
                </div>
                <div class="feature-item">
                    Expert market insights and research
                </div>
                <div class="feature-item">
                    24/7 trading support and guidance
                </div>
            </div>
            <p>If you didn't create an account with MonarkFX, please disregard this email.</p>
        </div>
        <div class="footer">
            © 2021 MonarkFX Trading Platform | Terms of Service | Privacy Policy<br>
            This is an automated message. Please do not reply to this email.
        </div>
    </div>
</body>
</html>
`;

export const getDeleteTemplate = (deletionLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Deletion Request - MonarkFX Trading Platform</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #ff0000, #cc0000);
            color: #ffffff;
            text-align: center;
            padding: 40px;
        }
        .content {
            padding: 40px;
        }
        h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
            color: #1a1a1a;
            font-size: 24px;
            margin-top: 0;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #333333;
        }
        .button {
            display: inline-block;
            padding: 15px 35px;
            background: linear-gradient(135deg, #ff0000, #cc0000);
            color: #ffffff;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
        }
        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeeba;
            color: #856404;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
            font-size: 16px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .alternatives {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 8px;
            margin-top: 30px;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
        }
        .alternative-item {
            margin-bottom: 20px;
            padding-left: 30px;
            position: relative;
        }
        .alternative-item:before {
            content: '➤';
            position: absolute;
            left: 0;
            color: #ff0000;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #666666;
            background-color: #f8f8f8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>We Value Your Trading Journey</h1>
        </div>
        <div class="content">
            <h2>Account Deletion Request</h2>
            <p>Dear Valued Trader,</p>
            <p>We've received a request to delete your MonarkFX trading account. Before proceeding, we want to ensure this is your intended action, as it will affect your trading access and history.</p>
            <p>If you're certain about deleting your account, please click the button below:</p>
            <a href="${deletionLink}" class="button">Confirm Account Deletion</a>
            <div class="warning">
                <strong>Warning:</strong> This action is irreversible. Once deleted, all your trading history, analysis settings, and personal data will be permanently removed from our systems.
            </div>
            <div class="alternatives">
                <h3>Consider these alternatives:</h3>
                <div class="alternative-item">
                    Temporarily deactivate your trading account
                </div>
                <div class="alternative-item">
                    Adjust your trading preferences and alerts
                </div>
                <div class="alternative-item">
                    Consult with our trading experts
                </div>
                <div class="alternative-item">
                    Contact our 24/7 support team
                </div>
            </div>
            <p>If you didn't request this deletion, please contact our support team immediately at support@monarkfx.com.</p>
        </div>
        <div class="footer">
            © 2021 MonarkFX Trading Platform | Terms of Service | Privacy Policy<br>
            This is an automated message. Please do not reply to this email.
        </div>
    </div>
</body>
</html>
`;

export const getResetTemplate = (resetLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password - MonarkFX Trading Platform</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #ff0000, #cc0000);
            color: #ffffff;
            text-align: center;
            padding: 40px;
        }
        .content {
            padding: 40px;
        }
        h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        h2 {
            color: #1a1a1a;
            font-size: 24px;
            margin-top: 0;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #333333;
        }
        .button {
            display: inline-block;
            padding: 15px 35px;
            background: linear-gradient(135deg, #ff0000, #cc0000);
            color: #ffffff;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #666666;
            background-color: #f8f8f8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Secure Your Trading Account</h1>
        </div>
        <div class="content">
            <h2>Reset Your Password</h2>
            <p>Dear Valued Trader,</p>
            <p>We received a request to reset the password for your MonarkFX trading account. To ensure the security of your account and maintain uninterrupted access to your trading activities, please click the button below:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>If you didn't request this password reset, please contact our security team immediately at security@monarkfx.com.</p>
        </div>
        <div class="footer">
            © 2021 MonarkFX Trading Platform | Terms of Service | Privacy Policy<br>
            This is an automated message. Please do not reply to this email.
        </div>
    </div>
</body>
</html>
`;