import React, { Component } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import items from '../constants/constants'

interface NavbarProps {
    activeElement: any // MenuItem
    setActiveElement: any
}

type NavbarState = {
    items: Object[]
}

export default class Navbar extends Component<NavbarProps, NavbarState> {
    constructor(props: NavbarProps) {
        super(props)

        this.state = {
            items: items
        }
    }

    render() {
        return (
            <div className="p-m-1 p-p-1 p-m-lg-3 p-b-lg-3">
                <TabMenu 
                model={this.state.items} 
                activeItem={this.props.activeElement}
                onTabChange={e => this.props.setActiveElement(e.value)}
                />
            </div>
        )
    }
}
