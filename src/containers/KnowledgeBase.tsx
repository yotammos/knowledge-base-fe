import * as React from 'react'
import { getInterests } from '../utils/restClient'
import Interest from '../models/Interest'
import StockResource from '../models/StockResource'
import '../styles/interests.css'
import { INTEREST_TYPES } from '../utils/constants'

interface Props {}

interface State {
  interests: Interest[]
}

const INFO_HEADER_ROW = [
    'Name',
    'Info'
]

const STOCK_HEADER_ROW = [
    'Name',
    'Value',
    'Time'
]

const POLL_HEADER_ROW = [
    'Party',
    'Candidate',
    'Percentage'
]

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

    loadInterests() {
        getInterests('2')
        .then(interests => {
            this.setState({
                interests
            })
        })
    }

    displayInterestsByType(title: string, header: string[], interestType: string) {
        if (this.hasInterestsByType(interestType)) {
            return <div>
                <h1 id='title'>{title}</h1>
                <table id='interests'>
                    <tbody>
                    <tr>{this.renderTableHeader(header)}</tr>
                    {this.renderTableData(this.state.interests.filter((interest) => interest.interestType === interestType))}
                    </tbody>
                </table>
            </div>
        }
    }

    displayInterests() {
        return <div>
            {this.displayInterestsByType('Info Interests', INFO_HEADER_ROW, INTEREST_TYPES.INFO)}
            <br />
            {this.displayInterestsByType('Stock Interests', STOCK_HEADER_ROW, INTEREST_TYPES.STOCK)}
            <br />
            {this.hasInterestsByType(INTEREST_TYPES.POLL) && this.displayPollInterests()}
        </div>
    }

    getInterestsByType(interestType: string) {
        return this.state.interests.filter(Interest => Interest.interestType === interestType)
    }

    hasInterestsByType(interestType: string) {
        return this.getInterestsByType(interestType).length > 0
    }

    displayPollInterests() {
        const pollInterests = this.getInterestsByType(INTEREST_TYPES.POLL)

        return <div>
            <h1 id='title'>Poll Interests</h1>
            {pollInterests.map(interest => interest.resources.map(resource => <div>
                    Description: Cycle = {resource.cycle}, pollster = {resource.pollster}, dates: {resource.startDate} - {resource.endDate}
                    <table id='interests'>
                        <tbody>
                            <tr>{this.renderTableHeader(POLL_HEADER_ROW)}</tr>
                            {this.renderPollEntries(resource.entries)}
                        </tbody>
                    </table>
                    <br />
                </div>
            ))}
        </div>
    }

    renderPollEntries(entries) {
        return entries.map((entry, index) => {
            return <tr key={index}>
                <td>{entry.party}</td>
                <td>{entry.candidate}</td>
                <td>{entry.percentage}</td>
            </tr>
        })
    }

    renderTableData(interests) {
        return interests.map((interest, index) => {
            return this.buildRowByInterest(interest, index)
        })
    }

    buildRowByInterest(interest, index) {
        if (interest.interestType === INTEREST_TYPES.INFO) {
            return <tr key={index}>
                <td>{interest.name}</td>
                <td>{interest.resources[0].info}</td>
            </tr>
        } else if (interest.interestType === INTEREST_TYPES.STOCK) {
            return <tr key={index}>
                <td>{interest.name}</td>
                <td>{interest.resources[0].currentValue}</td>
                <td>{interest.resources[0].time}</td>
            </tr>
        }
    }

    renderTableHeader(header: string[]) {
        return header.map((key, index) => <th key={index}>{key}</th>)
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