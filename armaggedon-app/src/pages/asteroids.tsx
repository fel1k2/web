import {AsteroidCard} from "../components/card/Card";
import styles from "./Asteroids.module.css"
import {Header} from "../components/header/header";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AsteroidsContext} from "../components/asteroids-context/AsteroidsContext";
import {getUserKey} from "../utils/getUserKey";

export const Asteroids = () => {

    useEffect(() => {
        try {
            const result = fetch(`https://api.nasa.gov/neo/rest/v1/feed?api_key=${getUserKey()}`).then((res) => { //mq5cS4cefFyslko9Hk8ajaMnwO2EuGIgluT8GXBr
                return res.json()
            }).then((response) => {
                let rawAsteroids = []
                for (const data in response.near_earth_objects) {
                    rawAsteroids = rawAsteroids.concat(response.near_earth_objects[data])
                }
                const asteroids = rawAsteroids.map(item => {
                    const size = Math.trunc((item.estimated_diameter.meters.estimated_diameter_max + item.estimated_diameter.meters.estimated_diameter_min) / 2);
                    const close = item.close_approach_data[0]
                    return {
                        name: item.name,
                        date: close.close_approach_date,
                        size,
                        distance: {
                            kilometers: close.miss_distance.kilometers,
                            lunar: close.miss_distance.lunar
                        },
                        isDangerous: item.is_potentially_hazardous_asteroid,
                        id: item.id
                    }
                })
                setAsteroids(asteroids)
//console.log(asteroids)
            })
        } catch (err) {
            console.log(err)
            setAsteroids(generateAsteroids())
        }
    }, [])
    const {asteroids, setAsteroids, onlyDangerous, setonlyDangerous, setDistanceMode} = useContext(AsteroidsContext);
    return (<div>
        <div>
            <Header/>
        </div>
        <div>
            <div>
                <div>
                    <input type="checkbox" value={onlyDangerous as unknown as string}
                           onChange={() => setonlyDangerous(!onlyDangerous)}>
                    </input>
                    <>Показать только опасные</>
                </div>

                <div className={styles.distances}>
                    <>Расстояние</>
                    <Link to={'/asteroids'} onClick={() => setDistanceMode(true)}>в километрах</Link>
                    <Link to={'/asteroids'} onClick={() => setDistanceMode(false)}>в дистанциях до луны</Link>
                </div>
            </div>
            {
                onlyDangerous ? asteroids.filter((item) => item.isDangerous).map((item) =>
                  <AsteroidCard key={item.id} {...item} />) : asteroids.map((item) =>
                  <AsteroidCard key={item.id} {...item} />)
            }
        </div>
    </div>)
}

const generateAsteroids = () => {
    const months = [
        `января`,
        `февраля`,
        `марта`,
        `апреля`,
        `мая`,
        `июня`,
        `июля`,
        `августа`,
        `сентября`,
        `октября`,
        `ноября`,
        `декабря`,];
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const result = [];
    for (let i = 0; i < 22; i++) {
        let namee = "";
        for (let j = 0; j < 5; j++) {
            namee += characters[(Math.random() * 25).toFixed(0)];
        }
        const name = namee;
        const date = `${(Math.random() * 27 + 1).toFixed(0)} ${months[(Math.random() * 12).toFixed(0)]} 2023`;
        const size = (Math.random() * 100 + 10).toFixed(0);
        const distance = (Math.random() * 90000000).toFixed(0);
        const isDangerous = Math.random() >= 0.5;
        result.push({name, date, size, distance, isDangerous, id: name})
    }
    return result;
}