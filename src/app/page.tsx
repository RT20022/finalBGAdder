'use client'

import Image from "next/image";
import styles from "./home.module.css"
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Navbar from "./UI/smallComponents/navbar/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className={`${styles.home} flex h-[70vh] px-10`} >


        <div className="flex justify-center content-center  flex-col w-1/2">
          <h1 className="text-3xl text-center">New Project For Practice</h1>
          <h4 className="text-xl text-center mt-3 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem labore</h4>
          <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id amet cum in. Eum aspernatur soluta reiciendis eos deleniti, facilis quaerat quisquam quis, architecto labore ea ipsam est molestiae itaque neque.</p>
          <div className="flex justify-center content-center mt-5">
            <Link href="/user/login" className={`${styles.btn_14} ${styles.custom_btn} mr-10`}>Login</Link>
            <Link href="/user/signup" className={`${styles.btn_14} ${styles.custom_btn}`}>Register</Link>
          </div>
        </div>



        <div className="w-1/2 flex justify-center content-center pt-10 ">
          {/* <div className="w-[75%] h-<w-[75%]>">
            <DotLottieReact
              src="https://lottie.host/8d8fdb1a-5427-44a0-b284-b238e8eadcb1/mnyXrwE2Ox.lottie"
              loop
              autoplay
            />
          </div> */}
        </div>
      </section>

    </>
  )
}
