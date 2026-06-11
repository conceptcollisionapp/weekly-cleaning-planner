import React, { useState, useEffect } from 'react';
import { FAMILY_MEMBERS, ROOMS, KIDS_CHORE_PRESETS, DEFAULT_REWARDS } from './data/initialData';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [selectedMember, setSelectedMember] = useState('Dad');
  const [points, setPoints] = useState({
    'Mom': 245,
    'Dad': 180,
    'Kid 1': 320,
    'Kid 2': 95,
    'Unassigned': 0
  });
  const [completedTasks, setCompletedTasks] = useState({});
  const [rewards, setRewards] = useState(DEFAULT_REWARDS);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ text: '', points: 10, roomId: 'kitchen' });

  const currentPoints = points[selectedMember] || 0;

  const handleTaskComplete = (roomId, taskId, taskPoints) => {
    const key = `${roomId}-${taskId}`;
    if (completedTasks[key]) return;

    setCompletedTasks(prev => ({ ...prev, [key]: true }));
    
    setPoints(prev => ({
      ...prev,
      [selectedMember]: (prev[selectedMember] || 0) + taskPoints
    }));
  };

  const claimReward = (rewardId) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || currentPoints < reward.pointsRequired) return;

    setRewards(prev => prev.map(r => 
      r.id === rewardId ? { ...r, claimed: true } : r
    ));

    setPoints(prev => ({
      ...prev,
      [selectedMember]: prev[selectedMember] - reward.pointsRequired
    }));
  };

  const addNewTask = () => {
    if (!newTask.text.trim()) return;
    
    // This is just UI for now - in a full version this would update data
    alert(`New task added: "${newTask.text}" (${newTask.points} points)`);
    setNewTask({ text: '', points: 10, roomId: 'kitchen' });
    setShowAddTask(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-bold tracking-tight mb-2">
              Family Chore Tracker 🏠✨
            </h1>
            <p className="text-xl text-white/70">Make chores fun and rewarding</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/60">Current Points</div>
            <div className="text-6xl font-bold text-yellow-400">{currentPoints}</div>
          </div>
        </div>

        {/* Family Members */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-white/80">Select Family Member</h2>
          <div className="flex flex-wrap gap-3">
            {FAMILY_MEMBERS.map(member => (
              <button
                key={member}
                onClick={() => setSelectedMember(member)}
                className={`px-8 py-4 rounded-2xl font-medium text-lg transition-all ${
                  selectedMember === member 
                    ? 'bg-white text-black scale-105 shadow-xl' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                {member}
                <div className="text-sm opacity-75 mt-1">
                  {points[member] || 0} pts
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Rooms &amp; Tasks</h2>
            <button 
              onClick={() => setShowAddTask(true)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-2"
            >
              + Add Custom Task
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROOMS.map(room => (
              <div 
                key={room.id}
                className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10"
              >
                <div 
                  className="h-3"
                  style={{ background: room.gradient }}
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl">{room.emoji}</div>
                    <div>
                      <h3 className="text-2xl font-bold">{room.name}</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {room.tasks.map(task => {
                      const key = `${room.id}-${task.id}`;
                      const isCompleted = completedTasks[key];
                      
                      return (
                        <div
                          key={task.id}
                          onClick={() => handleTaskComplete(room.id, task.id, task.points)}
                          className={`group flex justify-between items-center p-4 rounded-2xl cursor-pointer transition-all ${
                            isCompleted 
                              ? 'bg-green-500/20 line-through opacity-75' 
                              : 'hover:bg-white/10'
                          }`}
                        >
                          <span className="text-lg">{task.text}</span>
                          <span className="font-mono text-xl font-semibold text-yellow-400">+{task.points}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Store */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Reward Store 🎁</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map(reward => (
              <div 
                key={reward.id}
                className={`bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 transition-all ${
                  reward.claimed ? 'opacity-60' : 'hover:scale-105'
                }`}
              >
                <div className="text-6xl mb-6">{reward.name.split(' ')[0]}</div>
                <h3 className="text-2xl font-semibold mb-2">{reward.name}</h3>
                <div className="text-4xl font-bold text-yellow-400 mb-6">
                  {reward.pointsRequired} pts
                </div>
                
                <button
                  onClick={() => claimReward(reward.id)}
                  disabled={reward.claimed || currentPoints < reward.pointsRequired}
                  className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
                    reward.claimed 
                      ? 'bg-gray-600 cursor-not-allowed' 
                      : currentPoints >= reward.pointsRequired
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:scale-105'
                        : 'bg-white/10 cursor-not-allowed'
                  }`}
                >
                  {reward.claimed ? '✓ Claimed' : 'Claim Reward'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#16213e] p-8 rounded-3xl max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-6">Add New Task</h3>
            
            <input
              type="text"
              placeholder="Task description"
              value={newTask.text}
              onChange={(e) => setNewTask({...newTask, text: e.target.value})}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 mb-4 text-lg"
            />
            
            <div className="flex gap-4 mb-8">
              <input
                type="number"
                placeholder="Points"
                value={newTask.points}
                onChange={(e) => setNewTask({...newTask, points: parseInt(e.target.value)})}
                className="w-1/2 bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-lg"
              />
              <select
                value={newTask.roomId}
                onChange={(e) => setNewTask({...newTask, roomId: e.target.value})}
                className="w-1/2 bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-lg"
              >
                {ROOMS.map(room => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowAddTask(false)}
                className="flex-1 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addNewTask}
                className="flex-1 py-4 bg-yellow-400 text-black font-semibold rounded-2xl hover:bg-yellow-300"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;