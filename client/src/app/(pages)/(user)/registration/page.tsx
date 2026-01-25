"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegistrationPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: '',
        fathersName: '',
        experience: '',
        yearsOfExperience: '',
        dateOfBirth: { day: '', month: '', year: '' },
        gender: '',
        address: '',
        zipCode: '',
        email: '',
        mobNumber: '',
        alternatePhone: '',
        maritalStatus: '',
        occupation: '',
        education: '',
        city: '',
        courseIAT: '',
        courseACT: '',
        reference: '',
    });

    const [errors, setErrors] = useState<Record<string, string | undefined>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.fathersName.trim()) newErrors.fathersName = 'Father\'s Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.mobNumber.trim()) {
            newErrors.mobNumber = 'Mobile Number is required';
        } else if (!/^[0-9]{10}$/.test(formData.mobNumber.replace(/\s/g, ''))) {
            newErrors.mobNumber = 'Please enter a valid 10-digit mobile number';
        }
        if (!formData.dateOfBirth.day || !formData.dateOfBirth.month || !formData.dateOfBirth.year) {
            newErrors.dateOfBirth = 'Date of Birth is required';
        }
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.courseIAT && !formData.courseACT) {
            newErrors.course = 'Please select at least one course';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setSuccessMessage('');

        try {
            // Using NEXT_PUBLIC_API_URL instead of relative path
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registration`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit registration');
            }

            setSuccessMessage('Registration submitted successfully! Please check your email for confirmation.');

            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({
                    fullName: '',
                    fathersName: '',
                    experience: '',
                    yearsOfExperience: '',
                    dateOfBirth: { day: '', month: '', year: '' },
                    gender: '',
                    address: '',
                    zipCode: '',
                    email: '',
                    mobNumber: '',
                    alternatePhone: '',
                    maritalStatus: '',
                    occupation: '',
                    education: '',
                    city: '',
                    courseIAT: '',
                    courseACT: '',
                    reference: '',
                });
                setErrors({});
                setSuccessMessage('');
                router.push('/thank-you');
            }, 3000);
        } catch (error: unknown) {
            console.error('Error submitting form:', error);
            const errorMessage = error instanceof Error
                ? error.message
                : 'Something went wrong. Please try again.';
            setErrors({ submit: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleDateChange = (part: 'day' | 'month' | 'year') => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, part === 'year' ? 4 : 2);
        setFormData((prev) => ({
            ...prev,
            dateOfBirth: {
                ...prev.dateOfBirth,
                [part]: value,
            },
        }));
        if (errors.dateOfBirth) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.dateOfBirth;
                return newErrors;
            });
        }
    };

    return (
        <div className="min-h-screen bg-background pt-20 sm:pt-24 md:pt-28 py-6 sm:py-8 md:py-12 lg:py-20">
            <div className="container px-3 sm:px-4 md:px-6 max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-foreground">
                        Registration Form
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground">
                        You Choose Right!!
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-4 px-2">
                        Welcome Here, You are proving yourself different, because you choose to take risk.
                    </p>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                        <p className="text-xs sm:text-sm text-green-400 font-medium">{successMessage}</p>
                    </div>
                )}

                {/* Error Message */}
                {errors.submit && (
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-primary/10 border border-primary/30">
                        <p className="text-xs sm:text-sm text-primary font-medium">{errors.submit}</p>
                    </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-4 sm:p-6 md:p-8">
                    {/* Your Information Section */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 pb-2 border-b border-primary/30">
                            YOUR INFORMATION
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Full Name <span className="text-primary">*</span>
                                    </Label>
                                    <Input
                                        value={formData.fullName}
                                        onChange={handleChange('fullName')}
                                        disabled={isLoading}
                                        className={errors.fullName ? 'border-primary' : ''}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.fullName && (
                                        <p className="text-sm text-primary mt-1">{errors.fullName}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Father&apos;s Name <span className="text-primary">*</span>
                                    </Label>
                                    <Input
                                        value={formData.fathersName}
                                        onChange={handleChange('fathersName')}
                                        disabled={isLoading}
                                        className={errors.fathersName ? 'border-primary' : ''}
                                        placeholder="Enter father's name"
                                    />
                                    {errors.fathersName && (
                                        <p className="text-sm text-primary mt-1">{errors.fathersName}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Experience/Fresher
                                    </Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-between"
                                                disabled={isLoading}
                                            >
                                                {formData.experience || "Select Experience"}
                                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setFormData((prev) => ({ ...prev, experience: 'Fresher' }));
                                                    if (errors.experience) {
                                                        setErrors((prev) => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors.experience;
                                                            return newErrors;
                                                        });
                                                    }
                                                }}
                                            >
                                                Fresher
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setFormData((prev) => ({ ...prev, experience: 'Intermediate' }));
                                                    if (errors.experience) {
                                                        setErrors((prev) => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors.experience;
                                                            return newErrors;
                                                        });
                                                    }
                                                }}
                                            >
                                                Intermediate
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setFormData((prev) => ({ ...prev, experience: 'Experience' }));
                                                    if (errors.experience) {
                                                        setErrors((prev) => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors.experience;
                                                            return newErrors;
                                                        });
                                                    }
                                                }}
                                            >
                                                Experience
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Years of Experience
                                    </Label>
                                    <Input
                                        value={formData.yearsOfExperience}
                                        onChange={handleChange('yearsOfExperience')}
                                        disabled={isLoading}
                                        placeholder="Years of experience"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Date of Birth <span className="text-primary">*</span>
                                    </Label>
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <Input
                                            type="text"
                                            value={formData.dateOfBirth.day}
                                            onChange={handleDateChange('day')}
                                            disabled={isLoading}
                                            placeholder="DD"
                                            maxLength={2}
                                            className="w-16 sm:w-20 text-center text-sm sm:text-base"
                                        />
                                        <span className="text-muted-foreground text-sm sm:text-base">/</span>
                                        <Input
                                            type="text"
                                            value={formData.dateOfBirth.month}
                                            onChange={handleDateChange('month')}
                                            disabled={isLoading}
                                            placeholder="MM"
                                            maxLength={2}
                                            className="w-16 sm:w-20 text-center text-sm sm:text-base"
                                        />
                                        <span className="text-muted-foreground text-sm sm:text-base">/</span>
                                        <Input
                                            type="text"
                                            value={formData.dateOfBirth.year}
                                            onChange={handleDateChange('year')}
                                            disabled={isLoading}
                                            placeholder="YYYY"
                                            maxLength={4}
                                            className="w-20 sm:w-24 text-center text-sm sm:text-base"
                                        />
                                    </div>
                                    {errors.dateOfBirth && (
                                        <p className="text-xs sm:text-sm text-primary mt-1">{errors.dateOfBirth}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Gender <span className="text-primary">*</span>
                                    </Label>
                                    <RadioGroup
                                        value={formData.gender}
                                        onValueChange={(value) => {
                                            setFormData((prev) => ({ ...prev, gender: value }));
                                            if (errors.gender) {
                                                setErrors((prev) => {
                                                    const newErrors = { ...prev };
                                                    delete newErrors.gender;
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                        disabled={isLoading}
                                        className="flex flex-wrap gap-3 sm:gap-4"
                                    >
                                        {['Male', 'Female', 'Other'].map((option) => (
                                            <div key={option} className="flex items-center space-x-2">
                                                <RadioGroupItem value={option} id={`gender-${option}`} />
                                                <Label
                                                    htmlFor={`gender-${option}`}
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    {errors.gender && (
                                        <p className="text-sm text-primary mt-1">{errors.gender}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Address <span className="text-primary">*</span>
                                    </Label>
                                    <textarea
                                        value={formData.address}
                                        onChange={handleChange('address')}
                                        disabled={isLoading}
                                        rows={3}
                                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter your address"
                                    />
                                    {errors.address && (
                                        <p className="text-sm text-primary mt-1">{errors.address}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Zip Code
                                    </Label>
                                    <Input
                                        value={formData.zipCode}
                                        onChange={handleChange('zipCode')}
                                        disabled={isLoading}
                                        placeholder="Enter zip code"
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        E-Mail ID <span className="text-primary">*</span>
                                    </Label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange('email')}
                                        disabled={isLoading}
                                        className={errors.email ? 'border-primary' : ''}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-primary mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Mob Number <span className="text-primary">*</span>
                                    </Label>
                                    <Input
                                        type="tel"
                                        value={formData.mobNumber}
                                        onChange={handleChange('mobNumber')}
                                        disabled={isLoading}
                                        className={errors.mobNumber ? 'border-primary' : ''}
                                        placeholder="Enter 10-digit mobile number"
                                        maxLength={10}
                                    />
                                    {errors.mobNumber && (
                                        <p className="text-sm text-primary mt-1">{errors.mobNumber}</p>
                                    )}
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Alternate Phone
                                    </Label>
                                    <Input
                                        type="tel"
                                        value={formData.alternatePhone}
                                        onChange={handleChange('alternatePhone')}
                                        disabled={isLoading}
                                        placeholder="Alternate phone number"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Marital Status
                                    </Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-between"
                                                disabled={isLoading}
                                            >
                                                {formData.maritalStatus || "Select Marital Status"}
                                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setFormData((prev) => ({ ...prev, maritalStatus: 'Single' }));
                                                    if (errors.maritalStatus) {
                                                        setErrors((prev) => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors.maritalStatus;
                                                            return newErrors;
                                                        });
                                                    }
                                                }}
                                            >
                                                Single
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setFormData((prev) => ({ ...prev, maritalStatus: 'Married' }));
                                                    if (errors.maritalStatus) {
                                                        setErrors((prev) => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors.maritalStatus;
                                                            return newErrors;
                                                        });
                                                    }
                                                }}
                                            >
                                                Married
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setFormData((prev) => ({ ...prev, maritalStatus: 'Divorced' }));
                                                    if (errors.maritalStatus) {
                                                        setErrors((prev) => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors.maritalStatus;
                                                            return newErrors;
                                                        });
                                                    }
                                                }}
                                            >
                                                Divorced
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setFormData((prev) => ({ ...prev, maritalStatus: 'Widowed' }));
                                                    if (errors.maritalStatus) {
                                                        setErrors((prev) => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors.maritalStatus;
                                                            return newErrors;
                                                        });
                                                    }
                                                }}
                                            >
                                                Widowed
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Occupation
                                    </Label>
                                    <Input
                                        value={formData.occupation}
                                        onChange={handleChange('occupation')}
                                        disabled={isLoading}
                                        placeholder="Your occupation"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        Education
                                    </Label>
                                    <Input
                                        value={formData.education}
                                        onChange={handleChange('education')}
                                        disabled={isLoading}
                                        placeholder="Education qualification"
                                    />
                                </div>

                                <div>
                                    <Label className="text-sm font-medium mb-2 block">
                                        The City <span className="text-primary">*</span>
                                    </Label>
                                    <Input
                                        value={formData.city}
                                        onChange={handleChange('city')}
                                        disabled={isLoading}
                                        className={errors.city ? 'border-primary' : ''}
                                        placeholder="Enter your city"
                                    />
                                    {errors.city && (
                                        <p className="text-sm text-primary mt-1">{errors.city}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Selection Section */}
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 pb-2 border-b border-primary/30">
                            COURSE SELECTION
                        </h2>

                        <div className="space-y-4 sm:space-y-6">
                            {/* IAT Course */}
                            <div className="p-3 sm:p-4 rounded-lg border border-border bg-secondary/30">
                                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                                    INST. ADVANCE TRADING
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                                    (INDIAN CASH & DERIVATIVE MARKET) - IAT
                                </p>
                                <RadioGroup
                                    value={formData.courseIAT}
                                    onValueChange={(value) => {
                                        setFormData((prev) => ({ ...prev, courseIAT: value }));
                                        if (errors.course) {
                                            setErrors((prev) => {
                                                const newErrors = { ...prev };
                                                delete newErrors.course;
                                                return newErrors;
                                            });
                                        }
                                    }}
                                    disabled={isLoading}
                                    className="flex flex-wrap gap-2 sm:gap-4"
                                >
                                    {['ONE SEGMENT', 'BOTH SEGMENT - COMBO'].map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`courseIAT-${option}`} />
                                            <Label
                                                htmlFor={`courseIAT-${option}`}
                                                className="text-sm font-normal cursor-pointer"
                                            >
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            {/* ACT Course */}
                            <div className="p-3 sm:p-4 rounded-lg border border-border bg-secondary/30">
                                <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                                    Alpha Currency Trader
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                                    (FOREX & CRYPTOCURRENCY MARKET) - ACT
                                </p>
                                <RadioGroup
                                    value={formData.courseACT}
                                    onValueChange={(value) => {
                                        setFormData((prev) => ({ ...prev, courseACT: value }));
                                        if (errors.course) {
                                            setErrors((prev) => {
                                                const newErrors = { ...prev };
                                                delete newErrors.course;
                                                return newErrors;
                                            });
                                        }
                                    }}
                                    disabled={isLoading}
                                    className="flex flex-wrap gap-2 sm:gap-4"
                                >
                                    {['ONE SEGMENT', 'BOTH SEGMENT - COMBO'].map((option) => (
                                        <div key={option} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option} id={`courseACT-${option}`} />
                                            <Label
                                                htmlFor={`courseACT-${option}`}
                                                className="text-sm font-normal cursor-pointer"
                                            >
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            {errors.course && (
                                <p className="text-sm text-primary">{errors.course}</p>
                            )}
                        </div>

                        <div className="mt-6">
                            <Label className="text-sm font-medium mb-2 block">
                                From Where You Hear About Us? or Reference Name:
                            </Label>
                            <Input
                                value={formData.reference}
                                onChange={handleChange('reference')}
                                disabled={isLoading}
                                placeholder="Reference or how you heard about us"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center gap-4 pt-4 sm:pt-6 border-t border-border">
                        <Button
                            type="submit"
                            variant="default"
                            size="lg"
                            disabled={isLoading}
                            className="w-full sm:w-auto min-w-[200px] text-sm sm:text-base"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Registration'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
