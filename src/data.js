 let data={
  "snmpMonitoringConfig": {
    "enabled": true,
    "deviceSnmpMetrics": [
      {
        "metricName": "net-snmp.HOST-RESOURCES-MIB.cpuLoad",
        "metricDisplayName": "CPU Load",
        "isMonitored": true,
        "metricGroup": "CPU",
        "monitoredIndices": {
          "196608": {
            "isMonitored": true
          }
        },
        "pollingInterval": 300,
        "thresholdConfig": [
          {
            "severity": "MINOR",
            "value": 60,
            "message": "value breached minor threshold",
            "raiseAlarm": true
          },
          {
            "severity": "MAJOR",
            "value": 80,
            "message": "value breached major threshold",
            "raiseAlarm": true
          },
          {
            "severity": "CRITICAL",
            "value": 90,
            "message": "value breached critical threshold",
            "raiseAlarm": true
          }
        ],
        "unit": "%"
      },
      {
        "metricName": "net-snmp.HOST-RESOURCES-MIB.storageUtilization",
        "metricDisplayName": "Storage Utilization",
        "isMonitored": true,
        "metricGroup": "Storage",
        "monitoredIndices": {
          "31": {
            "isMonitored": true
          },
          "36": {
            "isMonitored": true
          },
          "38": {
            "isMonitored": true
          },
          "39": {
            "isMonitored": true
          },
          "60": {
            "isMonitored": true
          }
        },
        "pollingInterval": 300,
        "thresholdConfig": [
          {
            "severity": "MINOR",
            "value": 60,
            "message": "value breached minor threshold",
            "raiseAlarm": true
          },
          {
            "severity": "MAJOR",
            "value": 80,
            "message": "value breached major threshold",
            "raiseAlarm": true
          },
          {
            "severity": "CRITICAL",
            "value": 90,
            "message": "value breached critical threshold",
            "raiseAlarm": true
          }
        ],
        "unit": "%"
      }
    ],
    "interfaceSnmpMetrics": [
      {
        "metricName": "ALLVENDORS.IF-MIB.ifOutDiscards",
        "metricDisplayName": "OutDiscards",
        "isMonitored": true,
        "metricGroup": "Interface",
        "monitoredIndices": {
          "1": {
            "isMonitored": true
          },
          "2": {
            "isMonitored": true
          }
        },
        "pollingInterval": 300,
        "unit": "packets"
      },
      {
        "metricName": "ALLVENDORS.IF-MIB.ifOutErrors",
        "metricDisplayName": "OutErrors",
        "isMonitored": true,
        "metricGroup": "Interface",
        "monitoredIndices": {
          "1": {
            "isMonitored": true
          },
          "2": {
            "isMonitored": true
          }
        },
        "pollingInterval": 300,
        "unit": "packets"
      }
    ]
  }
}
export default  data;