import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchingGreeting } from '../redux/greeting/greetingReducer';

function Greeting() {
  const dispatch = useDispatch();
  const GeneratorGreeting = useSelector((state) => state.greeting);

  useEffect(() => {
    dispatch(fetchingGreeting());
  }, [dispatch]);

  if (GeneratorGreeting.length === 0) {
    return <div>Loading...</div>;
  }

  if (GeneratorGreeting.status === 'succeeded') {
    return (
      <h1>
        {GeneratorGreeting.greetings[0]}
      </h1>
    );
  }
}

export default Greeting;
