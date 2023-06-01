import styles from './AsteroidContent.module.css'
import {useContext} from "react";
import {AsteroidsContext} from "../../asteroids-context/AsteroidsContext";

type AsteroidContentProps = {
    name: string
    date: string
    distance: {
        kilometers: number
        lunar: number
    }
    size: number

}
export const AsteroidContent = (props: AsteroidContentProps) => {
    const { name, date, distance, size } = props
    const {distanceMode}= useContext(AsteroidsContext)
    return (
        <div>
            <div className={styles.contentName}>{name}</div>
            <div className={styles.contentWrapper}>
                <div className={styles.contentDate}>{`Дата: ${date}`}</div>
                <div className={styles.contentDistance}>
                    {distanceMode
                        ? `Расстояние: ${distance.kilometers} км`
                        : `Расстояние: ${distance.lunar} Лун`}
                </div>
                <div className={styles.contentSize}>{`Размер: ${size} м`}</div>
            </div>
        </div>
    )
}
const distanceModes = (distanceMode, distance) => {
    if (distanceMode) return `${distance} км`
    else return `${distance / 363104} Лун`
}