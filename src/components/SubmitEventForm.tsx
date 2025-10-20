import { useState } from 'react';
import { Button } from './ui/button';
import logoTemp from '../assets/logo-temp.png?url';

interface SubmitEventFormProps {
  onSuccess?: () => void;
}

export function SubmitEventForm({ onSuccess }: SubmitEventFormProps) {
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    venue: '',
    band: '',
    date: '',
    time: '',
    description: '',
    url: ''
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
      // Submit to serverless API endpoint
      const response = await fetch('/api/submitEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bandName: formData.band,
          venueName: formData.venue,
          venueCity: '', // Empty for now
          date: formData.date,
          time: formData.time,
          description: formData.description || '',
          eventUrl: formData.url,
          submitterName: formData.contactName,
          submitterEmail: formData.email
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit event');
      }

      console.log('Form data submitted successfully:', result);

      setSubmitSuccess(true);
      // Reset form
      setFormData({
        contactName: '',
        email: '',
        venue: '',
        band: '',
        date: '',
        time: '',
        description: '',
        url: ''
      });

      // Hide success message after 3 seconds and close modal
      setTimeout(() => {
        setSubmitSuccess(false);
        if (onSuccess) onSuccess();
      }, 3000);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={logoTemp}
            alt="Set List Logo"
            style={{ width: '54px', height: '54px', objectFit: 'contain' }}
          />
          <h2 className="text-2xl font-bold">Suggest a Live Music Event</h2>
        </div>
        <p className="text-sm text-gray-600">
          Help us grow West Michigan's live music calendar! Let us know if there's an event you'd like us to add and we'll take a look.
        </p>
      </div>

      {submitSuccess && (
        <div className="mt-6 mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <strong>Thanks for the submittal. We'll review it!</strong>
        </div>
      )}

      {submitError && (
        <div className="mt-6 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <strong>Error:</strong> {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
        {/* Contact Info - Side by Side - MOVED TO TOP */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Your Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              style={{ width: '100%', padding: '6px 8px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px' }}
              placeholder="Name"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '6px 8px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px' }}
              placeholder="email@example.com"
            />
          </div>
        </div>

        {/* Venue and Band - Side by Side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Venue Name</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              style={{ width: '100%', padding: '6px 8px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px' }}
              placeholder="Venue"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Band/Artist</label>
            <input
              type="text"
              name="band"
              value={formData.band}
              onChange={handleChange}
              style={{ width: '100%', padding: '6px 8px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px' }}
              placeholder="Artist"
            />
          </div>
        </div>

        {/* Date and Time */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              style={{ width: '100%', padding: '6px 8px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              style={{ width: '100%', padding: '6px 8px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px' }}
            />
          </div>
        </div>

        {/* Event URL */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>Event URL (optional)</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            style={{ width: '100%', padding: '6px 8px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px' }}
            placeholder="Facebook event, website, etc."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            backgroundColor: isSubmitting ? '#9ca3af' : '#ea580c',
            color: 'white',
            fontWeight: 'bold',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            marginTop: '24px',
            position: 'relative',
            zIndex: 10,
            pointerEvents: 'auto'
          }}
          onClick={(e) => {
            console.log('Button clicked!');
            if (isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Suggest Event'}
        </button>
      </form>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Submitted events will be reviewed before appearing on the site. Thanks for supporting local music!
      </p>
    </div>
  );
}
