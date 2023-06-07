import styles from './Card.module.css';
import { AsteroidContent } from './AsteroidContent/AsteroidContent';
import { AsteroidAction } from './AsteroidAction/AsteroidAction';
import { AsteroidImage } from './AsteroidImage/AsteroidImage';
import { AsteroidContentContainer } from './AsteroidContent/AsteroidContentContainer';
import { useContext } from 'react';
import { AsteroidsContext } from '../asteroids-context/AsteroidsContext';

    type AsteroidCardProps = {
        name:string;
        date:string;
        distance:{
            kilometers: number;
            lunar: number;
        };
        size:number;
        isDangerous:boolean;
    }
    export const AsteroidCard = (props: AsteroidCardProps) => {
        const { name, date, distance, size, isDangerous } = props;
        const {addAsteroid} = useContext(AsteroidsContext)

        return (
          <div className={styles.card}>
              <div className={isDangerous ? styles.cardRed : styles.normCard}>
                  <AsteroidImage />
                  <AsteroidContentContainer
                    name={name}
                    date={date}
                    distance={distance}
                    size={size}
                  />
                  <AsteroidAction isDangerous={isDangerous} onClick={()=>addAsteroid(props)}/>
              </div>
          </div>
        );
    };