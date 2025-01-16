export const getVerificationTemplate = (verificationLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Desire Div Learning Platform</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f0f4f8;
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
            background: linear-gradient(135deg, #6e8efb, #a777e3);
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
            color: #2c3e50;
            font-size: 24px;
            margin-top: 0;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #34495e;
        }
        .button {
            display: inline-block;
            padding: 15px 35px;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
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
            color: #6e8efb;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #7f8c8d;
            background-color: #ecf0f1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Desire Div!</h1>
        </div>
        <div class="content">
            <h2>Unlock Your Learning Potential</h2>
            <p>Dear Aspiring Learner,</p>
            <p>We're thrilled to welcome you to Desire Div, your gateway to a world of knowledge and skill development. To begin your exciting learning journey and ensure the security of your account, please verify your email address:</p>
            <a href="${verificationLink}" class="button">Verify Email & Start Learning</a>
            <p>Once verified, you'll unlock access to:</p>
            <div class="features">
                <div class="feature-item">
                    A vast library of expert-curated courses
                </div>
                <div class="feature-item">
                    Interactive learning experiences
                </div>
                <div class="feature-item">
                    Personalized learning paths
                </div>
                <div class="feature-item">
                    Certificates to showcase your achievements
                </div>
                <div class="feature-item">
                    A supportive global community of learners
                </div>
            </div>
            <p>If you didn't create an account with Desire Div, please disregard this email.</p>
        </div>
        <div class="footer">
            © 2024 Desire Div Learning Platform | Terms of Service | Privacy Policy<br>
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
    <title>Account Deletion Request - Desire Div Learning Platform</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f0f4f8;
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
            background: linear-gradient(135deg, #ff6b6b, #feca57);
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
            color: #2c3e50;
            font-size: 24px;
            margin-top: 0;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #34495e;
        }
        .button {
            display: inline-block;
            padding: 15px 35px;
            background: linear-gradient(135deg, #ff6b6b, #feca57);
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
            background-color: #e8f4fd;
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
            color: #ff6b6b;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #7f8c8d;
            background-color: #ecf0f1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>We're Sad to See You Go</h1>
        </div>
        <div class="content">
            <h2>Account Deletion Request</h2>
            <p>Dear Valued Learner,</p>
            <p>We've received a request to delete your Desire Div account. We're sorry to see you consider leaving our learning community. Before you make your final decision, we want to ensure this is what you really want.</p>
            <p>If you're certain about deleting your account, please click the button below:</p>
            <a href="${deletionLink}" class="button">Confirm Account Deletion</a>
            <div class="warning">
                <strong>Warning:</strong> This action is irreversible. Once your account is deleted, all your progress, achievements, and personal data will be permanently removed from our systems.
            </div>
            <div class="alternatives">
                <h3>Before you go, consider these alternatives:</h3>
                <div class="alternative-item">
                    Pause your account temporarily
                </div>
                <div class="alternative-item">
                    Customize your learning preferences
                </div>
                <div class="alternative-item">
                    Explore new courses or learning paths
                </div>
                <div class="alternative-item">
                    Reach out to our support team for assistance
                </div>
            </div>
            <p>If you didn't request to delete your account, please ignore this email and contact our support team immediately at support@desirediv.com.</p>
        </div>
        <div class="footer">
            © 2024 Desire Div Learning Platform | Terms of Service | Privacy Policy<br>
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
    <title>Reset Your Password - Desire Div Learning Platform</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f0f4f8;
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
            background: linear-gradient(135deg, #ff6b6b, #feca57);
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
            color: #2c3e50;
            font-size: 24px;
            margin-top: 0;
        }
        p {
            margin-bottom: 20px;
            font-size: 16px;
            color: #34495e;
        }
        .button {
            display: inline-block;
            padding: 15px 35px;
            background: linear-gradient(135deg, #ff6b6b, #feca57);
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
            color: #7f8c8d;
            background-color: #ecf0f1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <h2>Reset Your Password</h2>
            <p>Dear Valued Learner,</p>
            <p>We received a request to reset your password for your Desire Div account. If you made this request, please click the button below to reset your password:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email or contact our support team immediately at support@desirediv.com.</p>
        </div>
        <div class="footer">
            © 2024 Desire Div Learning Platform | Terms of Service | Privacy Policy<br>
            This is an automated message. Please do not reply to this email.
        </div>
    </div>
</body>
</html>
`;
