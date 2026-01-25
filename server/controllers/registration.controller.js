import nodemailer from "nodemailer";

// Email transporter configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const registerUser = async (req, res) => {
    try {
        const formData = req.body;

        // Validate required fields
        if (!formData.fullName || !formData.email || !formData.mobNumber) {
            return res.status(400).json({
                success: false,
                message: "Full Name, Email, and Mobile Number are required",
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        const adminEmail = process.env.TO_EMAIL || "monarkfx@gmail.com";

        console.log("Sending registration emails...");
        console.log("Admin email:", adminEmail);
        console.log("User email:", formData.email);

        // Send email to admin with registration details
        const adminEmailHtml = getRegistrationAdminTemplate(formData);

        try {
            await transporter.sendMail({
                from: process.env.FROM_EMAIL || '"MonarkFX" <monarkfx@gmail.com>',
                to: adminEmail,
                subject: `New Registration: ${formData.fullName} - Monark FX`,
                html: adminEmailHtml,
            });
        } catch (adminError) {
            console.error("Failed to send admin email:", adminError);
            // We continue to try sending user email even if admin email fails?? Or fail here.
            // Usually better to fail or log.
        }

        // Send thank you email to user
        const userEmailHtml = getUserThankYouTemplate({ name: formData.fullName });

        try {
            await transporter.sendMail({
                from: process.env.FROM_EMAIL || '"MonarkFX" <monarkfx@gmail.com>',
                to: formData.email,
                subject: "Thank You for Registering with Monark FX",
                html: userEmailHtml,
            });
        } catch (userError) {
            console.error("Failed to send user email:", userError);
            // Don't fail the request if user email fails, but log it
        }

        res.status(200).json({
            success: true,
            message:
                "Registration submitted successfully. Please check your email for confirmation.",
        });
    } catch (error) {
        console.error("Registration form error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit registration. Please try again later.",
        });
    }
};

const getRegistrationAdminTemplate = (data) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #991b1b; text-align: center;">New Registration Received</h2>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
        <h3 style="margin-top: 0;">Personal Information</h3>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.mobNumber}</p>
        <p><strong>Alternate Phone:</strong> ${data.alternatePhone || "N/A"}</p>
        <p><strong>Father's Name:</strong> ${data.fathersName}</p>
        <p><strong>DOB:</strong> ${data.dateOfBirth?.day
        }/${data.dateOfBirth?.month}/${data.dateOfBirth?.year}</p>
        <p><strong>Gender:</strong> ${data.gender}</p>
        <p><strong>Marital Status:</strong> ${data.maritalStatus || "N/A"}</p>
        
        <h3 style="margin-top: 20px;">Address & Other Details</h3>
        <p><strong>Address:</strong> ${data.address}</p>
        <p><strong>City:</strong> ${data.city}</p>
        <p><strong>Zip Code:</strong> ${data.zipCode || "N/A"}</p>
        <p><strong>Occupation:</strong> ${data.occupation || "N/A"}</p>
        <p><strong>Education:</strong> ${data.education || "N/A"}</p>
        <p><strong>Experience:</strong> ${data.experience || "N/A"}</p>
        <p><strong>Years of Experience:</strong> ${data.yearsOfExperience || "N/A"
        }</p>

        <h3 style="margin-top: 20px;">Course Selection</h3>
        <p><strong>IAT Course:</strong> ${data.courseIAT || "Not Selected"}</p>
        <p><strong>ACT Course:</strong> ${data.courseACT || "Not Selected"}</p>
        <p><strong>Reference:</strong> ${data.reference || "N/A"}</p>
      </div>
      <p style="text-align: center; color: #666; font-size: 12px; margin-top: 20px;">
        This email was sent from the MonarkFX Registration Form.
      </p>
    </div>
  `;
};

const getUserThankYouTemplate = ({ name }) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #991b1b;">Welcome to MonarkFX!</h1>
        <p style="font-size: 18px; line-height: 1.5;">Dear ${name},</p>
        <p style="font-size: 16px; line-height: 1.5;">
          Thank you for registering with us. We have successfully received your application.
        </p>
      </div>
      <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; text-align: center;">
        <p>Our team will review your details and contact you shortly, typically within 24-48 hours.</p>
        <p>In the meantime, feel free to explore our website or contact us if you have urgent queries.</p>
        <a href="https://monarkfx.com" style="display: inline-block; padding: 10px 20px; background-color: #991b1b; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px;">Visit Website</a>
      </div>
      <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #666;">
        <p>Best Regards,</p>
        <p><strong>Monark FX Team</strong></p>
        <p><a href="mailto:service@monarkfx.com" style="color: #991b1b;">service@monarkfx.com</a></p>
      </div>
    </div>
  `;
};
