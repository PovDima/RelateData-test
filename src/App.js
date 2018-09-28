
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import React from 'react';
import data from './data'
import Modal from 'react-modal'
import './App.css'


class App extends React.Component {
  state = {
    isOpen: false,
    name: '',
    nameRow: '',
    unitName: '',
    unit: '',
    edit: false,
    activeKey: ['0'],
    thresholdsName: [],
    thresholds: [],
    columnDefs: [
      { headerName: 'Metric', field: 'Metric' },
      { headerName: 'Monitored', checkboxSelection: true },
      { headerName: 'Unit', field: 'Unit' },
      { headerName: 'pollingInterval', field: 'pollingInterval' }
    ],
    rowData: [
      {
        Metric: data.snmpMonitoringConfig.deviceSnmpMetrics[0].metricDisplayName,
        Unit: data.snmpMonitoringConfig.deviceSnmpMetrics[0].unit,
        pollingInterval: data.snmpMonitoringConfig.deviceSnmpMetrics[0].pollingInterval,
        Thresholds: data.snmpMonitoringConfig.deviceSnmpMetrics[0].thresholdConfig
      },
      {
        Metric: data.snmpMonitoringConfig.deviceSnmpMetrics[1].metricDisplayName,
        Unit: data.snmpMonitoringConfig.deviceSnmpMetrics[1].unit,
        pollingInterval: data.snmpMonitoringConfig.deviceSnmpMetrics[1].pollingInterval,
        Thresholds: data.snmpMonitoringConfig.deviceSnmpMetrics[1].thresholdConfig
      }
    ],
    rowData1: [
      {
        Metric: data.snmpMonitoringConfig.interfaceSnmpMetrics[0].metricDisplayName,
        Unit: data.snmpMonitoringConfig.interfaceSnmpMetrics[0].unit,
        pollingInterval: data.snmpMonitoringConfig.interfaceSnmpMetrics[0].pollingInterval
      },
      {
        Metric: data.snmpMonitoringConfig.interfaceSnmpMetrics[1].metricDisplayName,
        Unit: data.snmpMonitoringConfig.interfaceSnmpMetrics[1].unit,
        pollingInterval: data.snmpMonitoringConfig.interfaceSnmpMetrics[1].pollingInterval
      },
    ],
  }
  click = () => {
    this.setState({ isOpen: false })
  }
  editData = () => {
    if (this.state.edit === false) {
      document.querySelectorAll('.input').forEach((e) => {
        e.readOnly = false;
      }); this.setState({ edit: true })
    }
    else {
      document.querySelectorAll('.input').forEach((e) => {
        e.readOnly = true;
      }); this.setState({ edit: false })
    }
  }
  onChange = (activeKey) => {
    this.setState({
      activeKey,
    });
  }
  onClicked = (e) => {
    this.setState({
      isOpen: true, nameRow: e.node.data.Metric, name: Object.getOwnPropertyNames(e.node.data)[0],
      unitName: Object.getOwnPropertyNames(e.node.data)[1], unit: e.node.data.Unit,
      thresholdsName: Object.getOwnPropertyNames(e.node.data.Thresholds[0]),
      thresholds: e.node.data.Thresholds
    });
  }
  getItems() {
    const items = [];

    items.push(
      <Panel header={`Device Metrics `} key={0} >
        <div className="ag-theme-balham row">
          <span className='text'> Device Metrics </span>
          <AgGridReact
            rowSelection='multiple'
            onRowClicked={this.onClicked}
            enableColResize={true}
            enableSorting={true}
            enableFilter={true}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}>
          </AgGridReact>
        </div>
      </Panel>
    );

    items.push(
      <Panel header={`Interface Metrics`} key={1} >
        <div className="ag-theme-balham row">
          <span className='text'> Interface Metrics </span>
          <AgGridReact
            rowSelection='multiple'
            enableColResize={true}
            enableSorting={true}
            enableFilter={true}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData1}>
          </AgGridReact>
        </div>
      </Panel>
    );
    return items;
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} >
        <div style={{ textAlign: 'center' }} className='text'> SNMP Monitoring Configuration</div>
        <div style={{ width: '100%', height: '100%' }}>
          <input type='checkbox' id="enabled"></input><label htmlFor='enabled'>Enabled</label>
          <Collapse
            onChange={this.onChange}
            activeKey={this.state.activeKey}
          >
            {this.getItems()}
          </Collapse>
          <Modal isOpen={this.state.isOpen} ariaHideApp={false} >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid grey ', paddingBottom: '1%' }}>
                <span>{this.state.name} Configuration</span>
                <button className='button' onClick={this.click}>Close</button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1%' }}>
                <button  className='button' onClick={this.editData}>Edit</button>
              </div>
              <div style={{ paddingTop: '1%' }}>
                <p className='text'>{this.state.nameRow}</p>
                <table cellSpacing='0' className='border'  >
                  <tbody>
                    <tr>
                      <td className='border'>Description</td><td className='border'>   </td>
                    </tr>
                    <tr><td className='border'>{this.state.unitName}</td><td className='border'>{this.state.unit}</td>
                    </tr>
                  </tbody>
                </table>
                <p className='text'>Thresholds</p>
                <div >
                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '50%' }}>
                    <div>Severity</div>
                    <div>Value</div>
                    <div>Raise Alarm</div>
                    <div>Message</div>
                  </div>
                  {this.state.thresholds.map((e, i) => {
                    return (
                      <div style={{ display: 'flex', justifyContent: 'space-around', width: '75%' }} key={i}>
                        <div style={{ width: '40px' }} ><p>{e.severity}</p></div>
                        <div style={{ marginLeft: '-3%' }} >
                          <p>Value*</p>
                          <input type='number' value={e.value} className='input' readOnly style={{ backgroundColor: 'rgb(223, 220, 220)', borderRadius: '5%', width: '45px', height: '25px' }}></input>
                        </div>
                        <div >
                          <p><input type='checkbox'  ></input></p>
                        </div>
                        <div  >
                          <p>Message*</p> <input type='text' className='input' onChange={this.changeMess} readOnly value={e.message} style={{ backgroundColor: 'rgb(223, 220, 220)', borderRadius: '5%', width: '350px', height: '25px' }}></input>
                        </div>
                      </div>)
                  })}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1%', paddingTop: '1%', borderTop: '1px solid silver' }}>
                    <button className='button' >Cancel</button>
                    <button className='button' style={{color:'white',backgroundColor:'rgb(100,220,100)'}}>Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal >
        </div >
      </div >
    );
  }
}

export default App;
