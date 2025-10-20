import { useState } from 'react';
import { Button } from './ui/button';

export function AdvertisingInquiryForm() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    contactEmail: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/submitAdvertisingInquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmitSuccess(true);
      // Reset form
      setFormData({
        businessName: '',
        contactName: '',
        contactEmail: '',
        message: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);

    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit inquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {submitSuccess && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <strong>Success!</strong> Thank you for your inquiry. We'll get back to you soon!
        </div>
      )}

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <strong>Error:</strong> {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Business/Venue Name *</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your Business Name"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Contact Name *</label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Your Name"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Contact Email *</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Tell us about your advertising needs..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </Button>
      </form>
    </div>
  );
}
