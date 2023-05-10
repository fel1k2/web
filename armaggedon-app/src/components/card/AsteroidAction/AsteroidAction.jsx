import styles from "./AsteroidAction.module.css";


export const AsteroidAction = ({isDangerous}) =>{
    return (
        <div>
            <div className={styles.actionGrade}>
                {`Оценка:      ${isDangerous ? `опасен` : `не опасен`}`}
            </div>
            <button className={styles.action}>
                <div className={styles.actionText}>
                    На уничтожение
                </div>
            </button>
        </div>
    )
}