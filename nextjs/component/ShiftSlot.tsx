"use client";
import React, { useState } from "react"
import styles from './ShiftSlot.module.scss'
import { Button } from "react-bootstrap"
import { useRouter } from 'next/navigation'

function ShiftSlot() {


    return (
        <div className={styles.explainCard}>
            <div className={`${styles.explainBox} ${styles.confirmed}`}>
                A
            </div><span className={styles.explainBoxFont}>:Shift Confirmed</span>
        </div>
    )
}

export default ShiftSlot;