import { useEffect, useState } from 'react';
import { Layout } from 'components/users';
import { Spinner } from 'components';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('api/proxmox/logs');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data && Array.isArray(data.data)) {
        setLogs(data.data);
      } else {
        console.error('Unexpected data format:', data);
        setLogs([]);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLogs([]);
    }
  };

  const parseLogMessage = (log) => {
    const parts = log.msg.split(':');
    const action = parts[0].trim();
    const taskDetails = parts.slice(1).join(':').trim();
    return { action, taskDetails };
  };

  return (
    <Layout>
      <h1>Proxmox Logs</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Action</th>
            <th style={{ width: '70%' }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log, index) => {
              const parsedLog = parseLogMessage(log);
              return (
                <tr key={index}>
                  <td>{parsedLog.action}</td>
                  <td>{parsedLog.taskDetails}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                {logs.length === 0 ? (
                  <Spinner />
                ) : (
                  <div>No logs to display</div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default Logs;
