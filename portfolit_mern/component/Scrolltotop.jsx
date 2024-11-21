import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Scrolltotop = () => {
  const { pathname } = useLocation();

  useEffect(() => {

    window.scrollTo({top : 0, left :0, behavior: 'auto'});

  }, [pathname]);

  useEffect(() => {

    window.scrollTo({top : 0, left :0, behavior: 'auto'});

  },[]);

  return null;




};

export default Scrolltotop;