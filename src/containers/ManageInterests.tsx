import * as React from 'react'
import { getInterests } from '../utils/restClient'
import Interest from '../models/Interest'
import '../styles/interests.css'

interface Props {}

interface State {
  interests: Interest[],
  selected: boolean[]
}

const INFO_HEADER_ROW = [
    'Name',
    'InterestType',
    'Action'
]

export default class ManageInterests extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    state = {
      interests: [
          {
            name: 'name',
            interestType: 'type'
          } as Interest
      ],
      selected: [
          false
      ]
    }

    loadInterests() {
        getInterests('2')
        .then(interests => {
            if (interests && interests.length > 0) {
                this.setState({
                    interests,
                    selected: interests.map((value, index) => false)
                })
            }
        })
    }

    onSubmit(event) {
        event.preventDefault()
        const relevantInterests = this.state.interests.filter((value, index) => this.state.selected[index])

        console.log('relevant interests = ' + JSON.stringify(relevantInterests))
    }

    displayInterestsByType(title: string, header: string[]) {
        return <div>
            <h1 id='title'>{title}</h1>
            <form onSubmit={this.onSubmit}>
                <table id='interests'>
                    <tbody>
                        <tr>{this.renderTableHeader(header)}</tr>
                        {this.renderTableData(this.state.interests)}
                    </tbody>
                </table>
                <input type="submit" value="Submit" />
            </form>
        </div>
    }

    handleChange(event, index) {
        this.setState({
            selected: this.state.selected.map((value, subIndex) => {
                if (subIndex === index) {
                    return event.target.checked
                } else {
                    return value
                }
            })
        })
    }

    renderTableData(interests) {
        return interests.map((interest, index) => {
            return <tr key={index}>
                <td>{interest.name}</td>
                <td>{interest.interestType}</td>
                <td>
                    <input
                        type="checkbox"
                        onChange={e => this.handleChange(e, index)} 
                    />
                </td>
            </tr>
        })
    }

    renderTableHeader(header: string[]) {
        return header.map((key, index) => <th key={index}>{key}</th>)
    }

    render () {
      return (
        <div>
            {this.loadInterests()}
            Welcome to Knowledge Base
            {this.displayInterestsByType('Current Interests', INFO_HEADER_ROW)}
        </div>
      )
    }
  }