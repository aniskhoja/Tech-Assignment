import { useEffect, useMemo, useRef, useState } from 'react';
import InputComp from './components/InputComp';
import RadioInput from './components/RadioInput';
import emailjs from '@emailjs/browser';
import { validate } from './middleware/validate';
import './App.css';

function App() {
  //state variable
  const initialValues = useMemo(() => { return { InsurancePkg: null, Email: "", Age: "", Gender: "" } },[]) ;
  const [formValues, setFormValues] = useState(initialValues);
  const [status, setStatus] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  //ref vairable
  const form = useRef();
  const selectElement = useRef();

  //submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(formValues))
    setIsSubmit(true)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  };
 
  useEffect(() => {
    if (errors.length === 0 && isSubmit) {
      //sending email
      emailjs.sendForm(process.env.REACT_APP_EMAIL_SERVICEID, process.env.REACT_APP_EMAIL_TEMP, form.current, process.env.REACT_APP_EMAIL_KEY)
        .then((result) => {
          alert("message send")
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
      //clearing fields after submit
      selectElement.current.value = "";
      setFormValues(initialValues);

      setIsSubmit(false)
    };

    //enable fields once insurance is selected
    if (formValues.InsurancePkg !== null) {
      setStatus(false)
    }
   
  }, [formValues.InsurancePkg, initialValues, isSubmit, errors]);

  return (
    <div className="app">
      { //error message
        errors[0] !== undefined && <div className="errorLabel">
          <p>{errors[0]}</p>
      </div>}
      <form ref={form} onSubmit={handleSubmit}>
        <fieldset>
          {/* reusable radio component */}
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
        <div className='emailInfo'>
          {/* reusable  */}
          <InputComp
            type="email"
            label="Email"
            setValue={formValues.Email}
            changeEvent={handleChange}
            status={status}
            placeholder="Please enter your email" />
          <InputComp type="text"
            label="Age"
            setValue={formValues.Age}
            changeEvent={handleChange}
            status={status}
            placeholder="Please enter your age" />
          <label>Gender:</label>
          <select ref={selectElement} name="Gender" disabled={status} onChange={handleChange}>
            <option defaultChecked value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="female">Female</option>
          </select>
          <button disabled={status}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default App;
