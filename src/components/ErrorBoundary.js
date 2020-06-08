import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    constructor() {
        super()

        this.state = {
           error: false 
        }
    }
    static getDerivedStateFromError(err){

        return { error: true }
    }

    render(){
        if(this.state.error){
            return <div>Something went wrong!</div>
        }

        return this.props.children
    }
}
