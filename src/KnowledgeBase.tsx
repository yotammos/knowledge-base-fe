import * as React from 'react'
import { getInterests } from './restClient'
import Interest from './models/Interest'
import StockResource from './models/StockResource'
import './styles/interests.css'

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

/*
      ("cycle", Json fromInt cycle),
      ("state", Json fromString state.getOrElse("Federal")),
      ("pollster", Json fromString pollster),
      ("fteGrade", Json fromString fteGrade),
      ("sampleSize", Json fromInt sampleSize),
      ("officeType", Json fromString officeType),
      ("startDate", Json fromString startDate.toString),
      ("endDate", Json fromString endDate.toString),
      ("stage", Json fromString stage),
      ("entries", Json fromValues entries.map(entry => Json.obj(
        ("party", Json fromString entry.party),
        ("candidate", Json fromString entry.candidate),
        ("percentage", Json.fromDouble(entry.percentage).getOrElse(throw new Exception("can't parse percentage")))
      )))
*/

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
        getInterests('1')
        .then(interests => {
            this.setState({
                interests
            })
        })
    }

    displayInterestsByType(title: string, header: string[], interestType: string) {
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

    displayInterests() {
        return <div>
            {this.displayInterestsByType('Info Interests', INFO_HEADER_ROW, 'INFO')}
            <br />
            {this.displayInterestsByType('Stock Interests', STOCK_HEADER_ROW, 'STOCK')}
            <br />
            {this.displayPollInterests()}
        </div>
    }

    displayPollInterests() {
        const pollInterests = this.state.interests.filter(Interest => Interest.interestType === 'POLL')

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
        if (interest.interestType === 'INFO') {
            return <tr key={index}>
                <td>{interest.name}</td>
                <td>{interest.resources[0].info}</td>
            </tr>
        } else if (interest.interestType === 'STOCK') {
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

    renderStockTableHeader() {
        return Object.keys(STOCK_HEADER_ROW)
        .map((key, index) => <th key={index}>{key}</th>)
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