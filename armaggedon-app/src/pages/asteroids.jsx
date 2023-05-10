import {Header} from "../components/header/header";
import {AsteroidCard} from "../components/card/Card";
import styles from "./Asteroids.module.css"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
export const Asteroids = () => {
    const [asteroids, setAsteroids] = useState([])

    const [onlyDangerous,setonlyDangerous] = useState(false)
    const [onlyhdistanceMode, setonlyhdistanceMode] = useState(true)
    useEffect( ()=>{
        try {
            const result =  fetch("https://api.nasa.gov/neo/rest/v1/feed?api_key=H94YRDb6SiGB53kYh5lC4N68Hj4gu9UcsrBhdOM5").then((res) => {
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
            })
        } catch (err){
            console.log(err)
            setAsteroids(generateAsteroids())
        }
    }, [])
    return (<div>
        <div>
            <Header/>
        </div>
        <div>
            <div>
                <div>
                    <input type="checkbox" value={onlyDangerous} onChange={()=>setonlyDangerous(!onlyDangerous)}>
                    </input>
                    <label>Показать только опасные</label>
                </div>

                <div className={styles.distances}>
                    <label >Расстояние</label>
                    <Link onClick={()=>setonlyhdistanceMode(true)}>в километрах</Link>
                    <Link onClick={()=>setonlyhdistanceMode(false)}>в дистанциях до луны</Link>
                </div>
            </div>
            {
                onlyDangerous ? asteroids.filter((item)=>item.isDangerous).map((item)=>
                    <AsteroidCard key={item.id} {...item} distanceMode={onlyhdistanceMode}/>) : asteroids.map((item)=>
                    <AsteroidCard key={item.id} {...item} distanceMode={onlyhdistanceMode}/>)
            }
        </div>
    </div>)
}

const generateAsteroids = ()=> {
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
    for (let i = 0; i < (Math.random() * 20 + 2).toFixed(0); i++) {
        let namee = "";
        for (let j = 0; j < (Math.random() * 10 + 2).toFixed(0); j++) {
            namee += characters[(Math.random() * 25).toFixed(0)];
        }
        const name = namee;
        const date = `${(Math.random() * 27 + 1).toFixed(0)} ${months[(Math.random() * 12).toFixed(0)]} 2023`;
        const size = (Math.random() * 100 + 10).toFixed(0);
        const distance = (Math.random() * 90000000).toFixed(0);
        const isDangerous = Math.random() >=0.5;
        result.push({name, date, size, distance, isDangerous, id: name})
    }
    return result;
}