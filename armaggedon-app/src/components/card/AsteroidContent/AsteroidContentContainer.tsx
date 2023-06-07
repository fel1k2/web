import { AsteroidContent } from './AsteroidContent';
import { useContext } from 'react';
import { AsteroidsContext } from '../../asteroids-context/AsteroidsContext';

export const AsteroidContentContainer = (props) => {

  const {distanceMode} = useContext(AsteroidsContext)
  return <AsteroidContent {...props} distanceMode={distanceMode}/>
}