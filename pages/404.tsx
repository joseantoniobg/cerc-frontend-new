import React from 'react'
import styles from '../styles/NotFound.module.scss'
import { useRouter } from 'next/router';
import { Button } from 'antd';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className={styles.screen}>
      <div className={styles.content}></div>
      <p className={styles.title}>Nadinha...</p>
      <p className={styles.subtitle}>Não há nada por aqui...</p>
      <div className={styles.btn}>
        <div className={styles.btnContent}>
            <Button onClick={() => router.push("/")}>Voltar pra Home</Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound;
