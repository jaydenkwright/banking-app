import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Welcome from './Welcome'
import Transaction from './Transaction'

export default function TransactionDashboard() {
    return (
        <div>
            <Welcome/>
            <Transaction />
        </div>
    )
}
