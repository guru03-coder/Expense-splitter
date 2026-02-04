import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';
import { CreateGroupScreen } from './screens/CreateGroupScreen';
import { GroupDetailScreen } from './screens/GroupDetailScreen';
import { AddExpenseScreen } from './screens/AddExpenseScreen';
import { SettlementsScreen } from './screens/SettlementsScreen';


function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<HomeScreen />} />
        <Route path="/create-group" element={<CreateGroupScreen />} />
        <Route path="/group/:id" element={<GroupDetailScreen />} />
        <Route path="/group/:id/add-expense" element={<AddExpenseScreen />} />
        <Route path="/group/:id/settlements" element={<SettlementsScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
