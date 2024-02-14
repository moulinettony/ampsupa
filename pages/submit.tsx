import React from 'react';

const IndexPage: React.FC = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    
    try {
      const response = await fetch('http://localhost:3000/api/submission', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        console.log('Form submitted successfully:', Object.fromEntries(formData));
        // Optionally, you can handle success here (e.g., show a success message)
      } else {
        console.error('Error submitting form:', response.statusText);
        // Optionally, you can handle errors here (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally, you can handle errors here (e.g., show an error message)
    }
  };
  
  return (
    <div>
      <h1>AMP Form</h1>
      <form method="post" action="/api/submission" onSubmit={handleSubmit} target="_top">
        <fieldset>
          <label>
            Name:
            <input type="text" name="name" required />
          </label>
          <label>
            Email:
            <input type="email" name="email" required />
          </label>
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default IndexPage;
