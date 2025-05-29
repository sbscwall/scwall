export const handleEmail = async (email, setError, setSuccessMessage, navigate) => {
  // Validate email format
  console.log('Validating email:', email); // Log email to check before validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    console.log('Invalid email format');
    setError('Please enter a valid email address');
    return;
  }
  console.log('Email validated successfully');

  try {
    // Log that we're about to send the request
    console.log('Sending email to backend:', email);

    // Send the email to your backend for database storage
    const response = await fetch('https://scwall-07910aebdb79.herokuapp.com/api/submit-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    console.log('Response received from backend:', response.status); // Log response status

    // Check if the response is ok (successful)
    if (response.ok) {
      // Log the data received from the backend
      const data = await response.json();
      console.log('Backend Response (Success):', data);

      // Store email in localStorage after backend success
      localStorage.setItem('submittedEmail', email);

      // Set success message
      setSuccessMessage(data.message || 'Thank you for signing up!');
      navigate("/thankyou");

    } else {
      // Log if response is not ok
      const data = await response.json();
      console.log('Backend Response (Error):', data);

      // Handle the error response from backend (e.g., email already exists)
      setError(data.message || 'Failed to submit email');
    }

  } catch (error) {
    // Log any network or fetch errors
    console.error('Error during fetch request:', error);
    setError('Error submitting email');
  }
};
