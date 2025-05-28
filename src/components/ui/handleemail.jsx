export const handleEmail = async (email, setError, setSuccessMessage, navigate) => {
  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
  }

  try {
      // Send the email to your backend for database storage
      const response = await fetch('http://localhost:5000/api/submit-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
      });

      if (response.ok) {
          // Backend success response
          const data = await response.json();
          console.log('Backend Response:', data);  // Log response data
          // Store email in localStorage after backend success
          localStorage.setItem('submittedEmail', email); // Store email in localStorage
          setSuccessMessage(data.message || 'Thank you for signing up!');
          navigate("/thankyou");
      } else {
          const data = await response.json();
          // Handle the error response from backend (e.g., email already exists)
          setError(data.message || 'Failed to submit email');
          console.log('Backend Response:', data);  // Log response data
      }
  } catch (error) {
      console.error(error); // Optionally log the error
      setError('Error submitting email');
  }
};
