export const getVerificationTemplate = (verificationLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - MonarkFX - Global Trading Excellence</title>
    <style>
        body {
            font-family: 'Inter', 'Segoe UI', 'Arial', sans-serif;
            line-height: 1.6;
            color: #e5e7eb;
            background: linear-gradient(135deg, #000000, #111827);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #1f2937, #111827);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(34, 197, 94, 0.2);
            position: relative;
        }
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #22c55e, #10b981, #059669);
        }
        .header {
            background: linear-gradient(135deg, #1f2937, #111827);
            color: #ffffff;
            text-align: center;
            padding: 40px 30px;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.1), transparent 50%);
        }
        .logo {
            font-size: 28px;
            font-weight: 800;
            color: #22c55e;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
        .content {
            padding: 40px 30px;
            background: linear-gradient(180deg, #1f2937, #111827);
        }
        h1 {
            margin: 0 0 10px 0;
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        h2 {
            color: #22c55e;
            font-size: 24px;
            margin: 0 0 20px 0;
            font-weight: 600;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #d1d5db;
            line-height: 1.7;
        }
        .button {
            display: inline-block;
            padding: 16px 32px;
            background: linear-gradient(135deg, #22c55e, #10b981);
            color: #ffffff;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
            border: none;
            position: relative;
            overflow: hidden;
        }
        .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        .button:hover::before {
            left: 100%;
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(34, 197, 94, 0.4);
        }
        .features {
            background: linear-gradient(145deg, #374151, #1f2937);
            padding: 30px;
            border-radius: 12px;
            margin: 30px 0;
            border: 1px solid rgba(34, 197, 94, 0.2);
            position: relative;
        }
        .features::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #22c55e, #10b981);
        }
        .feature-item {
            margin-bottom: 15px;
            padding-left: 25px;
            position: relative;
            color: #e5e7eb;
            font-size: 15px;
        }
        .feature-item:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: #22c55e;
            font-weight: bold;
            font-size: 16px;
        }
        .feature-item:last-child {
            margin-bottom: 0;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .footer {
            text-align: center;
            padding: 25px 30px;
            font-size: 14px;
            color: #9ca3af;
            background: linear-gradient(145deg, #111827, #0f172a);
            border-top: 1px solid rgba(34, 197, 94, 0.1);
        }
        .footer a {
            color: #22c55e;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        @media (max-width: 600px) {
            body { padding: 10px; }
            .container { border-radius: 12px; }
            .header, .content { padding: 30px 20px; }
            h1 { font-size: 28px; }
            h2 { font-size: 20px; }
            .button { padding: 14px 28px; font-size: 15px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">MonarkFX</div>
            <h1>Welcome to Trading Excellence</h1>
        </div>
        <div class="content">
            <h2>Begin Your Financial Journey</h2>
            <p>Dear Valued Trader,</p>
            <p>Welcome to <strong>MonarkFX - Global Trading Excellence</strong>. You're about to join an elite community of traders and investors. Our expert-led programs will guide you through:</p>
            
            <div class="features">
                <div class="feature-item">Advanced Stock Market Strategies</div>
                <div class="feature-item">Professional Forex Trading Techniques</div>
                <div class="feature-item">Cryptocurrency Market Analysis</div>
                <div class="feature-item">Risk Management & Portfolio Optimization</div>
                <div class="feature-item">Real-time Market Analysis Tools</div>
            </div>

            <p>To begin your journey towards financial mastery, please verify your email address:</p>
            
            <div class="button-container">
                <a href="${verificationLink}" class="button">Verify Email & Start Trading</a>
            </div>
            
            <p style="font-size: 14px; color: #9ca3af; text-align: center;">
                If you didn't create an account with MonarkFX Trading Academy, please disregard this email.
            </p>
        </div>
        <div class="footer">
            <div style="margin-bottom: 10px;">
                <strong>© ${new Date().getFullYear()} MonarkFX - Global Trading Excellence</strong>
            </div>
            <div style="margin-bottom: 5px;">Professional Trading Education & Market Analysis</div>
            <div style="font-size: 12px; color: #6b7280;">
                This is an automated message. Please do not reply to this email.
            </div>
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
    <title>Account Deletion Request - MonarkFX - Global Trading Excellence</title>
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
            <p>Dear Valued Student,</p>
            <p>We've received a request to delete your MonarkFX - Global Trading Excellence account. Before proceeding, we want to ensure this is your intended action, as it will affect your access to trading courses, learning materials, and progress records.</p>
            <p>If you're certain about deleting your account, please click the button below:</p>
            <a href="${deletionLink}" class="button">Confirm Account Deletion</a>
            <div class="warning">
                <strong>Warning:</strong> This action is irreversible. Once deleted, all your learning history, course progress, and personal data will be permanently removed from our systems.
            </div>
            <div class="alternatives">
                <h3>Consider these alternatives:</h3>
                <div class="alternative-item">
                    Temporarily pause your learning journey
                </div>
                <div class="alternative-item">
                    Discuss options with your trading mentor or instructor
                </div>
                <div class="alternative-item">
                    Contact our support team for assistance
                </div>
            </div>
            <p>If you didn't request this deletion, please contact our support team immediately at monarkfx@gmail.com.</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} MonarkFX - Global Trading Excellence<br>
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
    <title>Reset Your Password - MonarkFX - Global Trading Excellence</title>
    <style>
        body {
            font-family: 'Inter', 'Segoe UI', 'Arial', sans-serif;
            line-height: 1.6;
            color: #e5e7eb;
            background: linear-gradient(135deg, #000000, #111827);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #1f2937, #111827);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(34, 197, 94, 0.2);
            position: relative;
        }
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #22c55e, #10b981, #059669);
        }
        .header {
            background: linear-gradient(135deg, #1f2937, #111827);
            color: #ffffff;
            text-align: center;
            padding: 40px 30px;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.1), transparent 50%);
        }
        .logo {
            font-size: 28px;
            font-weight: 800;
            color: #22c55e;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
        .content {
            padding: 40px 30px;
            background: linear-gradient(180deg, #1f2937, #111827);
        }
        h1 {
            margin: 0 0 10px 0;
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        h2 {
            color: #22c55e;
            font-size: 24px;
            margin: 0 0 20px 0;
            font-weight: 600;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #d1d5db;
            line-height: 1.7;
        }
        .button {
            display: inline-block;
            padding: 16px 32px;
            background: linear-gradient(135deg, #22c55e, #10b981);
            color: #ffffff;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
            border: none;
            position: relative;
            overflow: hidden;
        }
        .button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        .button:hover::before {
            left: 100%;
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(34, 197, 94, 0.4);
        }
        .security-notice {
            background: linear-gradient(145deg, #374151, #1f2937);
            padding: 25px;
            border-radius: 12px;
            margin: 25px 0;
            border: 1px solid rgba(34, 197, 94, 0.2);
            position: relative;
        }
        .security-notice::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #22c55e, #10b981);
        }
        .security-icon {
            color: #22c55e;
            font-size: 18px;
            margin-right: 8px;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .footer {
            text-align: center;
            padding: 25px 30px;
            font-size: 14px;
            color: #9ca3af;
            background: linear-gradient(145deg, #111827, #0f172a);
            border-top: 1px solid rgba(34, 197, 94, 0.1);
        }
        .footer a {
            color: #22c55e;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        @media (max-width: 600px) {
            body { padding: 10px; }
            .container { border-radius: 12px; }
            .header, .content { padding: 30px 20px; }
            h1 { font-size: 28px; }
            h2 { font-size: 20px; }
            .button { padding: 14px 28px; font-size: 15px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">MonarkFX</div>
            <h1>Secure Your Account</h1>
        </div>
        <div class="content">
            <h2>Reset Your Password</h2>
            <p>Dear Valued Trader,</p>
            <p>We received a request to reset the password for your <strong>MonarkFX - Global Trading Excellence</strong> account. To ensure the security of your account and maintain uninterrupted access to your trading education and resources, please click the button below:</p>
            
            <div class="button-container">
                <a href="${resetLink}" class="button">Reset Password</a>
            </div>
            
            <div class="security-notice">
                <p style="margin: 0; color: #e5e7eb;">
                    <span class="security-icon">🔒</span>
                    <strong>Security Notice:</strong> This link will expire in 24 hours for your protection. If you didn't request this password reset, please contact our support team immediately at <a href="mailto:monarkfx@gmail.com" style="color: #22c55e;">monarkfx@gmail.com</a>
                </p>
            </div>
        </div>
        <div class="footer">
            <div style="margin-bottom: 10px;">
                <strong>© ${new Date().getFullYear()} MonarkFX - Global Trading Excellence</strong>
            </div>
            <div style="margin-bottom: 5px;">Professional Trading Education & Market Analysis</div>
            <div style="font-size: 12px; color: #6b7280;">
                This is an automated message. Please do not reply to this email.
            </div>
        </div>
    </div>
</body>
</html>
`;

export const getFeeReceiptTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fee Payment Receipt - MonarkFX - Global Trading Excellence</title>
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
            <h1>Payment Confirmation</h1>
        </div>
        <div class="content">
            <h2>Fee Payment Receipt</h2>
            <p>Dear ${data.userName},</p>
            <p>Thank you for your payment. Your transaction for trading education fees was successful.</p>
            <div class="payment-details">
                <p><strong>Amount Paid:</strong> ₹${data.amount}</p>
                <p><strong>Payment ID:</strong> ${data.paymentId}</p>
                <p><strong>Date:</strong> ${new Date(
                  data.date
                ).toLocaleDateString()}</p>
            </div>
            <p>Please find your receipt attached to this email. We look forward to continuing your trading journey with us.</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} MonarkFX - Global Trading Excellence<br>
            This is an automated message. Please do not reply.
        </div>
    </div>
</body>
</html>
`;

export const getFeeNotificationTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Fee Assignment - MonarkFX - Global Trading Excellence</title>
    <style>
        body {
            font-family: 'Inter', 'Segoe UI', 'Arial', sans-serif;
            line-height: 1.6;
            color: #e5e7eb;
            background: linear-gradient(135deg, #000000, #111827);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #1f2937, #111827);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(34, 197, 94, 0.2);
            position: relative;
        }
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #22c55e, #10b981, #059669);
        }
        .header {
            background: linear-gradient(135deg, #1f2937, #111827);
            color: #ffffff;
            text-align: center;
            padding: 40px 30px;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 50%, rgba(34, 197, 94, 0.1), transparent 50%);
        }
        .logo {
            font-size: 28px;
            font-weight: 800;
            color: #22c55e;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
        .content {
            padding: 40px 30px;
            background: linear-gradient(180deg, #1f2937, #111827);
        }
        h1 {
            margin: 0 0 10px 0;
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        h2 {
            color: #22c55e;
            font-size: 24px;
            margin: 0 0 20px 0;
            font-weight: 600;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #d1d5db;
            line-height: 1.7;
        }
        .fee-details {
            background: linear-gradient(145deg, #374151, #1f2937);
            padding: 25px;
            border-radius: 12px;
            margin: 25px 0;
            border: 1px solid rgba(34, 197, 94, 0.2);
            position: relative;
        }
        .fee-details::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #22c55e, #10b981);
        }
        .fee-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 12px 0;
            padding: 12px 0;
            border-bottom: 1px solid rgba(34, 197, 94, 0.2);
        }
        .fee-item:last-child {
            border-bottom: none;
        }
        .fee-label {
            font-weight: 600;
            color: #e5e7eb;
        }
        .fee-value {
            color: #d1d5db;
            font-weight: 500;
        }
        .important {
            color: #22c55e;
            font-weight: 700;
            text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
        }
        .btn {
            display: inline-block;
            padding: 16px 32px;
            background: linear-gradient(135deg, #22c55e, #10b981);
            color: #ffffff;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            margin-top: 20px;
            transition: all 0.3s ease;
            box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
            border: none;
        }
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(34, 197, 94, 0.4);
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .footer {
            text-align: center;
            padding: 25px 30px;
            font-size: 14px;
            color: #9ca3af;
            background: linear-gradient(145deg, #111827, #0f172a);
            border-top: 1px solid rgba(34, 197, 94, 0.1);
        }
        .footer a {
            color: #22c55e;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        @media (max-width: 600px) {
            body { padding: 10px; }
            .container { border-radius: 12px; }
            .header, .content { padding: 30px 20px; }
            h1 { font-size: 28px; }
            .fee-details { padding: 20px; }
            .fee-item { flex-direction: column; align-items: flex-start; gap: 5px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">MonarkFX</div>
            <h1>New Fee Assignment</h1>
        </div>
        <div class="content">
            <h2>Fee Details</h2>
            <div class="fee-details">
                <div class="fee-item">
                    <span class="fee-label">Title:</span>
                    <span class="fee-value">${data.title}</span>
                </div>
                <div class="fee-item">
                    <span class="fee-label">Amount:</span>
                    <span class="important">₹${data.amount}</span>
                </div>
                <div class="fee-item">
                    <span class="fee-label">Due Date:</span>
                    <span class="important">${new Date(
                      data.dueDate
                    ).toLocaleDateString()}</span>
                </div>
                ${
                  data.description
                    ? `
                <div class="fee-item">
                    <span class="fee-label">Description:</span>
                    <span class="fee-value">${data.description}</span>
                </div>
                `
                    : ""
                }
                ${
                  data.lateFeeDate
                    ? `
                <div class="fee-item">
                    <span class="fee-label">Late Fee After:</span>
                    <span class="important">${new Date(
                      data.lateFeeDate
                    ).toLocaleDateString()}</span>
                </div>
                `
                    : ""
                }
                ${
                  data.lateFeeAmount
                    ? `
                <div class="fee-item">
                    <span class="fee-label">Late Fee Amount:</span>
                    <span class="important">₹${data.lateFeeAmount}</span>
                </div>
                `
                    : ""
                }
            </div>
            <p>Please ensure timely payment to continue your uninterrupted trading education with us.</p>
            <div class="button-container">
                <a href="${
                  process.env.FRONTEND_URL
                }/dashboard/fees" class="btn">View Fee Details</a>
            </div>
        </div>
        <div class="footer">
            <div style="margin-bottom: 10px;">
                <strong>© ${new Date().getFullYear()} MonarkFX - Global Trading Excellence</strong>
            </div>
            <div style="margin-bottom: 5px;">Professional Trading Education & Market Analysis</div>
            <div style="font-size: 12px; color: #6b7280;">
                This is an automated message. Please do not reply to this email.
            </div>
        </div>
    </div>
</body>
</html>
`;

export const getPaymentSuccessTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful - MonarkFX - Global Trading Excellence</title>
    <style>
        body {
            font-family: 'Inter', 'Segoe UI', 'Arial', sans-serif;
            line-height: 1.6;
            color: #e5e7eb;
            background: linear-gradient(135deg, #000000, #111827);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #1f2937, #111827);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(34, 197, 94, 0.2);
            position: relative;
        }
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #22c55e, #10b981, #059669);
        }
        .header {
            background: linear-gradient(135deg, #22c55e, #16a34a);
            color: #ffffff;
            text-align: center;
            padding: 40px 30px;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1), transparent 50%);
        }
        .logo {
            font-size: 28px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        .success-icon {
            font-size: 48px;
            margin-bottom: 20px;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        .content {
            padding: 40px 30px;
            background: linear-gradient(180deg, #1f2937, #111827);
        }
        h1 {
            margin: 0 0 10px 0;
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        h2 {
            color: #22c55e;
            font-size: 24px;
            margin: 0 0 20px 0;
            font-weight: 600;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #d1d5db;
            line-height: 1.7;
        }
        .payment-details {
            background: linear-gradient(145deg, #374151, #1f2937);
            border: 1px solid rgba(34, 197, 94, 0.3);
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            position: relative;
        }
        .payment-details::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #22c55e, #10b981);
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid rgba(34, 197, 94, 0.2);
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #e5e7eb;
        }
        .detail-value {
            color: #d1d5db;
            font-weight: 500;
        }
        .amount {
            font-size: 24px;
            color: #22c55e;
            font-weight: 700;
            text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
        }
        .success-message {
            background: linear-gradient(145deg, #374151, #1f2937);
            padding: 20px;
            border-radius: 12px;
            margin: 25px 0;
            border: 1px solid rgba(34, 197, 94, 0.2);
            text-align: center;
        }
        .footer {
            text-align: center;
            padding: 25px 30px;
            font-size: 14px;
            color: #9ca3af;
            background: linear-gradient(145deg, #111827, #0f172a);
            border-top: 1px solid rgba(34, 197, 94, 0.1);
        }
        .footer a {
            color: #22c55e;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        @media (max-width: 600px) {
            body { padding: 10px; }
            .container { border-radius: 12px; }
            .header, .content { padding: 30px 20px; }
            h1 { font-size: 28px; }
            .payment-details { padding: 20px; }
            .detail-row { flex-direction: column; align-items: flex-start; gap: 5px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">MonarkFX</div>
            <div class="success-icon">✓</div>
            <h1>Payment Successful!</h1>
        </div>
        <div class="content">
            <h2>Transaction Confirmed</h2>
            <p>Dear <strong>${data.userName}</strong>,</p>
            <p>Your payment for trading education fees has been successfully processed. Here are your transaction details:</p>
            
            <div class="payment-details">
                <div class="detail-row">
                    <span class="detail-label">Amount Paid:</span>
                    <span class="amount">₹${data.amount}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Receipt Number:</span>
                    <span class="detail-value">${data.receiptNumber}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Payment ID:</span>
                    <span class="detail-value">${data.paymentId}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span class="detail-value">${new Date(
                      data.date
                    ).toLocaleString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Fee Type:</span>
                    <span class="detail-value">${data.feeTitle}</span>
                </div>
            </div>

            <div class="success-message">
                <p style="margin: 0; color: #22c55e; font-weight: 600;">
                    🎉 Your payment receipt has been attached to this email for your records.
                </p>
            </div>

            <p>Thank you for your prompt payment! We look forward to continuing your trading education journey together.</p>
        </div>
        <div class="footer">
            <div style="margin-bottom: 10px;">
                <strong>© ${new Date().getFullYear()} MonarkFX - Global Trading Excellence</strong>
            </div>
            <div style="margin-bottom: 5px;">Professional Trading Education & Market Analysis</div>
            <div style="font-size: 12px; color: #6b7280;">
                For any queries, please contact our support team at <a href="mailto:monarkfx@gmail.com">monarkfx@gmail.com</a>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const getPaymentFailureTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Failed - MonarkFX - Global Trading Excellence</title>
    <style>
        body {
            font-family: 'Inter', 'Segoe UI', 'Arial', sans-serif;
            line-height: 1.6;
            color: #e5e7eb;
            background: linear-gradient(135deg, #000000, #111827);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #1f2937, #111827);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(239, 68, 68, 0.2);
            position: relative;
        }
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #ef4444, #dc2626, #b91c1c);
        }
        .header {
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: #ffffff;
            text-align: center;
            padding: 40px 30px;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1), transparent 50%);
        }
        .logo {
            font-size: 28px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        .failed-icon {
            font-size: 48px;
            margin-bottom: 20px;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
        .content {
            padding: 40px 30px;
            background: linear-gradient(180deg, #1f2937, #111827);
        }
        h1 {
            margin: 0 0 10px 0;
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        h2 {
            color: #ef4444;
            font-size: 24px;
            margin: 0 0 20px 0;
            font-weight: 600;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #d1d5db;
            line-height: 1.7;
        }
        .error-box {
            background: linear-gradient(145deg, #374151, #1f2937);
            border: 1px solid rgba(239, 68, 68, 0.3);
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            position: relative;
        }
        .error-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #ef4444, #dc2626);
        }
        .error-box h3 {
            color: #ef4444;
            margin: 0 0 15px 0;
            font-size: 18px;
        }
        .error-box p {
            margin: 8px 0;
            color: #e5e7eb;
        }
        .error-box strong {
            color: #fca5a5;
        }
        .reasons-list {
            background: linear-gradient(145deg, #374151, #1f2937);
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .reasons-list ul {
            margin: 0;
            padding-left: 20px;
            color: #d1d5db;
        }
        .reasons-list li {
            margin: 8px 0;
        }
        .retry-button {
            display: inline-block;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            color: #ffffff;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            margin-top: 20px;
            transition: all 0.3s ease;
            box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
            border: none;
        }
        .retry-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(239, 68, 68, 0.4);
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .footer {
            text-align: center;
            padding: 25px 30px;
            font-size: 14px;
            color: #9ca3af;
            background: linear-gradient(145deg, #111827, #0f172a);
            border-top: 1px solid rgba(239, 68, 68, 0.1);
        }
        .footer a {
            color: #ef4444;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
        @media (max-width: 600px) {
            body { padding: 10px; }
            .container { border-radius: 12px; }
            .header, .content { padding: 30px 20px; }
            h1 { font-size: 28px; }
            .error-box, .reasons-list { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">MonarkFX</div>
            <div class="failed-icon">✕</div>
            <h1>Payment Failed</h1>
        </div>
        <div class="content">
            <h2>Transaction Unsuccessful</h2>
            <p>Dear <strong>${data.userName}</strong>,</p>
            <p>We're sorry, but your recent payment attempt for trading education fees was unsuccessful.</p>
            
            <div class="error-box">
                <h3>Transaction Details:</h3>
                <p><strong>Amount:</strong> ₹${data.amount}</p>
                <p><strong>Date:</strong> ${new Date(data.date).toLocaleString(
                  "en-IN"
                )}</p>
                <p><strong>Fee Type:</strong> ${data.feeTitle}</p>
                <p><strong>Error:</strong> ${
                  data.error || "Transaction could not be completed"
                }</p>
            </div>

            <div class="reasons-list">
                <h3 style="color: #ef4444; margin: 0 0 15px 0;">Possible reasons for payment failure:</h3>
                <ul>
                    <li>Insufficient funds in your account</li>
                    <li>Bank server issues</li>
                    <li>Network connectivity problems</li>
                    <li>Transaction timeout</li>
                </ul>
            </div>

            <p>Please try again or contact your bank if the issue persists.</p>
            
            <div class="button-container">
                <a href="${
                  process.env.FRONTEND_URL
                }/dashboard/fees" class="retry-button">
                    Retry Payment
                </a>
            </div>
        </div>
        <div class="footer">
            <div style="margin-bottom: 10px;">
                <strong>© ${new Date().getFullYear()} MonarkFX - Global Trading Excellence</strong>
            </div>
            <div style="margin-bottom: 5px;">Professional Trading Education & Market Analysis</div>
            <div style="font-size: 12px; color: #6b7280;">
                Need help? Contact our support team at <a href="mailto:monarkfx@gmail.com">monarkfx@gmail.com</a>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const getFeeUpdateTemplate = ({
  name,
  feeTitle,
  oldAmount,
  newAmount,
  oldDate,
  newDate,
  reason,
}) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #EF4444; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #666; }
        .amount { font-size: 18px; font-weight: bold; color: #EF4444; }
        .details { margin: 20px 0; padding: 15px; background: white; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Fee Update Notification</h2>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>This is to inform you that there has been an update to your trading education fee: <strong>${feeTitle}</strong></p>
            
            <div class="details">
                <h3>Update Details:</h3>
                <p><strong>Amount:</strong> ₹${oldAmount} → ₹${newAmount}</p>
                <p><strong>Due Date:</strong> ${oldDate} → ${newDate}</p>
                <p><strong>Reason:</strong> ${reason}</p>
            </div>

            <p>If you have any questions about this update, please contact our support team.</p>
        </div>
        <div class="footer">
            <p>MonarkFX - Global Trading Excellence</p>
            <small>This is an automated message, please do not reply.</small>
        </div>
    </div>
</body>
</html>
`;

export const getCertificateGeneratedTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate Generated - MonarkFX - Global Trading Excellence</title>
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
        .certificate-info {
            background-color: #f8f9fa;
            padding: 30px;
            border-radius: 8px;
            margin-top: 30px;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
        }
        .certificate-id {
            font-family: monospace;
            background: #f0f0f0;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 14px;
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
            margin: 20px 0;
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
            <h1>Congratulations!</h1>
        </div>
        <div class="content">
            <h2>Trading Achievement Accomplished</h2>
            <p>Dear ${data.userName},</p>
            <p>We are delighted to inform you that you have successfully completed the course:</p>
            <h3 style="color: #cc0000;">${data.courseName}</h3>
            
            <div class="certificate-info">
                <p><strong>Your certificate of trading excellence has been generated!</strong></p>
                <p>Certificate ID: <span class="certificate-id">${
                  data.certificateId
                }</span></p>
                <p>You can now access and download your certificate from your profile. This marks an important milestone in your trading journey with us.</p>
            </div>

            <center>
                <a href="${
                  process.env.FRONTEND_URL
                }/user-profile" class="button">View Certificate</a>
            </center>

            <p>This certificate validates your dedication to financial markets and your commitment to learning. Continue on the path of trading excellence!</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} MonarkFX - Global Trading Excellence<br>
            This is an automated message. Please do not reply to this email.
        </div>
    </div>
</body>
</html>
`;

export const getContactFormTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission - MonarkFX - Global Trading Excellence</title>
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
            padding: 30px;
        }
        .content {
            padding: 30px;
        }
        h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        h2 {
            color: #1a1a1a;
            font-size: 22px;
            margin-top: 0;
        }
        .message-box {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .contact-details {
            margin-top: 30px;
            padding: 20px;
            background-color: #f0f0f0;
            border-radius: 8px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #666666;
            background-color: #f8f8f8;
        }
        .detail-row {
            margin-bottom: 10px;
        }
        .detail-label {
            font-weight: bold;
            display: inline-block;
            width: 100px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Trading Inquiry</h1>
        </div>
        <div class="content">
            <h2>${data.subject || "Inquiry About Trading Education"}</h2>
            
            <div class="message-box">
                <p>${data.message}</p>
            </div>
            
            <div class="contact-details">
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span>${data.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span>${data.email}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span>${data.phone}</span>
                </div>
            </div>
            
            <p>Please respond to this inquiry about our trading programs at your earliest convenience.</p>
        </div>
        <div class="footer">
            © ${new Date().getFullYear()} MonarkFX - Global Trading Excellence<br>
            This is an automated message from your website contact form.
        </div>
    </div>
</body>
</html>
`;
