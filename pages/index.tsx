import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Login from './account/login'
import { useAuth } from '../context/UserContext';
import Inicio from './inicio'

const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    user ? <Inicio /> : <Login />
  )
}

export default Home
