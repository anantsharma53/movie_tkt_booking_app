
import styles from "./MovieHeader.module.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
export function MovieHeader({ movie }) {
    console.log(movie);

    return (
        <section className={styles.header}>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={movie.image} alt={movie.title} className={styles.image} />
                </div>
                <div className={styles.detailsContainer}>
                    <h3 className={styles.title}>{movie.title}</h3>
                    <p className={styles.languages}>
                        <span>{movie.language}</span>
                    </p>
                    <p>
                        <a className={styles.btnGenres}>{movie.genre}</a>
                    </p>
                    <p className={styles.dates}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-date" viewBox="0 0 16 16">
                            {/* SVG path data */}
                        </svg> &nbsp;
                        {/* Render date here */}
                        &nbsp;&nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                            {/* SVG path data */}
                        </svg> &nbsp;
                        {/* Render duration here */}
                    </p>
                </div>
            </div>
        </section>
    );
}

