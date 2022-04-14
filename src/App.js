import { useEffect, useRef, useState } from 'react';
import './App.css';
import EmailInput from './components/EmailInput';
import RadioInput from './components/RadioInput';
import emailjs from '@emailjs/browser';

function App() {
  const initialValues = { InsurancePkg: null, Email: "", Age: "", Gender: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [status, setStatus] = useState(true);

  const form = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form.current)
    //email
    emailjs.sendForm('service_w7s5rpp', 'template_ezuti83', form.current, '4VbZqkuzu4iEZ4gZ_')
      .then((result) => {
          alert("message send")
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
    console.log(formValues)
  };
 
  useEffect(() => {
    if (formValues.InsurancePkg !== null) {
      setStatus(false)
    }
  }, [formValues.InsurancePkg]);

  return (
    <div className="app">
      <form ref={form} onSubmit={handleSubmit}>
        <fieldset>
          <RadioInput
            heading="Proteco Insurance"
            clickEvent={handleChange}
            price="$12.50">
            Our most affordable package. Your personal belongings will be covered up to 15k$.
            This is perfect if you own a few belongings.
          </RadioInput>
          <RadioInput
            heading="Umbrella Insurance"
            clickEvent={handleChange}
            price="$35.73">
            Our most popular package. Your personal belongings will be covered up to 30k$.
            This package also includes a free water sensor to detect a water leak in your home.
          </RadioInput>
          <RadioInput
            heading="Thor insurance"
            clickEvent={handleChange}
            price="$79.30">Nothing but the best. Your personal belongings will be covered up to 100k$.
            It even includes a protection against an alien invasion.
          </RadioInput>
        </fieldset>
        <EmailInput
          type="email"
          label="Email"
          setValue={formValues.Email}
          changeEvent={handleChange}
          status={status}
          placeholder="Please enter your email" />
        <EmailInput type="text"
          label="Age"
          setValue={formValues.Age}
          changeEvent={handleChange}
          status={status}
          placeholder="Please enter your age" />
        <label>Gender:</label>
        <select name="Gender" disabled={status} onChange={handleChange}>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="female">Female</option>
        </select>
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
