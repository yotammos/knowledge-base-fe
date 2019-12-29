import * as React from 'react'
import { getInterests } from './restClient'
import Interest from './models/Interest'
import StockResource from './models/StockResource'
import './styles/interests.css'

interface Props {}

interface State {
  interests: Interest[]
}

export default class KnowledgeBase extends React.Component<Props, State> {
    state = {
      interests: [
          {
            name: 'name',
            interestType: 'type',
            resources: [
                {
                    currentValue: 'stock value',
                    time: 'current time'
                } as StockResource
            ]
          } as Interest
      ]
    }

    loadInterests = () => {
        getInterests('1')
        .then(interests => {
            this.setState({
                interests
            })
        })
    }

    displayInterests = () =>
        <div>
            <h1 id='title'>Interests</h1>
            <table id='interests'>
                <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                </tbody>
            </table>
        </div>

    renderTableData() {
        return this.state.interests.map((interest, index) => {
            const { name, interestType, resources} = interest
            return (
                <tr key={index}>
                    <td>{name}</td>
                    <td>{interestType}</td>
                    <td>{this.renderResource(interestType, resources)}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        return Object.keys(this.state.interests[0])
        .map((key, index) => <th key={index}>{key}</th>)
    }

    renderResource(interestType: string, resources: any[]) {
        console.log(JSON.stringify(resources))
        if (resources.length === 0) {
            return <div>No resources found</div>
        }
        const resource = resources[0]
        if (interestType === 'STOCK') {
            console.info('stock resource')
            return <div>{`value: ${resource.currentValue}, time: ${resource.time}`}</div>
        } else if (interestType === 'INFO') {
            console.info('info resource')
            return <div>{resource.info}</div>
        } else if (interestType == 'POLL') {
            console.log('poll resource')
            return <div>{`cycle = ${resource.cycle}, pollster = ${resource.pollster}`}</div>
        }
        return <div>No resources found</div>
    }

    render () {
      return (
        <div>
            {this.loadInterests()}
            Welcome to Knowledge Base
            {this.displayInterests()}
        </div>
      )
    }
  }