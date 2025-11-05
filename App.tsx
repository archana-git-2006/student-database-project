import React, { useState, useEffect } from 'react';
import { Role, StudentEntry, StaffEntry, VisitorEntry } from './types';
import LoginPage from './components/Sidebar'; // Repurposed as LoginPage
import StudentDashboard from './components/ChatWindow'; // Repurposed as StudentDashboard
import StaffDashboard from './components/InputBar'; // Repurposed as StaffDashboard
import VisitorDashboard from './components/RecipeCard'; // Repurposed as VisitorDashboard

const App: React.FC = () => {
  const [role, setRole] = useState<Role>(Role.NONE);

  // State lifted to the main App component
  const [studentEntries, setStudentEntries] = useState<StudentEntry[]>(() => {
    const saved = localStorage.getItem('studentEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [staffEntries, setStaffEntries] = useState<StaffEntry[]>(() => {
    const saved = localStorage.getItem('staffEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [visitorEntries, setVisitorEntries] = useState<VisitorEntry[]>(() => {
    const saved = localStorage.getItem('visitorEntries');
    return saved ? JSON.parse(saved) : [];
  });

  // Effects to persist state to localStorage
  useEffect(() => {
    localStorage.setItem('studentEntries', JSON.stringify(studentEntries));
  }, [studentEntries]);

  useEffect(() => {
    localStorage.setItem('staffEntries', JSON.stringify(staffEntries));
  }, [staffEntries]);

  useEffect(() => {
    localStorage.setItem('visitorEntries', JSON.stringify(visitorEntries));
  }, [visitorEntries]);

  const handleLogin = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(Role.NONE);
  };

  // Handler functions to be passed down as props
  const addStudentEntry = (entry: StudentEntry) => setStudentEntries([entry, ...studentEntries]);
  const addStaffEntry = (entry: StaffEntry) => setStaffEntries([entry, ...staffEntries]);
  const addVisitorEntry = (entry: VisitorEntry) => setVisitorEntries([entry, ...visitorEntries]);
  const removeVisitorEntry = (visitorId: number) => setVisitorEntries(visitorEntries.filter(v => v.id !== visitorId));


  const renderContent = () => {
    switch (role) {
      case Role.STUDENT:
        return <StudentDashboard onLogout={handleLogout} entries={studentEntries} addEntry={addStudentEntry} />;
      case Role.STAFF:
        return <StaffDashboard onLogout={handleLogout} staffLog={staffEntries} addStaffLog={addStaffEntry} studentEntries={studentEntries} visitorEntries={visitorEntries} />;
      case Role.VISITOR:
        return <VisitorDashboard onLogout={handleLogout} visitors={visitorEntries} addVisitor={addVisitorEntry} removeVisitor={removeVisitorEntry} />;
      default:
        return <LoginPage onSelectRole={handleLogin} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-900 text-white antialiased">
      {renderContent()}
    </div>
  );
};

export default App;
