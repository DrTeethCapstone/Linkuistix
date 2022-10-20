import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {
  collection,
  getDocs,
  query,
  orderBy,
  limitToLast,
  limit,
  startAfter,
  endBefore,
} from 'firebase/firestore';
import { db } from '../../../firebase';

function LeaderboardModal({ handleLeaderboardClose, showLeaderboard }) {

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');


  
  useEffect(() => {
    const getData = async () => {
      const first = query(
        collection(db, 'scores'),
        orderBy('score', 'desc'),
        limit(10)
      );
      const docSnap = await getDocs(first);
      let newArr = []
      docSnap.forEach((doc) => {
        newArr.push(doc.data());
      });
      setLeaderboard(newArr)
      setLoading(false);
    };
    getData();
  },[showLeaderboard]);

  const handleNext = async () => {
    const lastVisible = leaderboard[leaderboard.length - 1];
    const next = query(
      collection(db, 'scores'),
      orderBy('score', 'desc'),
      startAfter(lastVisible.score),
      limit(10)
    );
    console.log(next)
    const nextDoc = await getDocs(next);
    if (nextDoc.docs.length) {
      setMessage('');
      let newArr = [];
      nextDoc.forEach((doc) => {
        console.log(doc.data())
        newArr.push(doc.data());
      });
      setLeaderboard(newArr);
    } else {
      setMessage('Last page');
    }
  };

  const handlePrev = async () => {
    const firstVisible = leaderboard[0];
    const next = query(
      collection(db, 'scores'),
      orderBy('score', 'desc'),
      endBefore(firstVisible.score),
      limitToLast(10)
    );

    const nextDoc = await getDocs(next);
    if (nextDoc.docs.length) {
      setMessage('');
      let newArr = [];
      nextDoc.forEach((doc, idx, arr) => {
        newArr.push(doc.data());
      });
      setLeaderboard(newArr);
    } else {
      setMessage('Cant go back');
    }
  };

  return (
    <Modal
      show={showLeaderboard}
      onHide={handleLeaderboardClose}
      dialogClassName="modalStyle"
    >
      <div className="leaderboards-container">
        <div className="leaderboardTopper">
          <span className="pointer" onClick={handleLeaderboardClose}>
            X
          </span>
        </div>
        <h1>Leaderboards</h1>
        {loading ? (
          <p>loading...</p>
        ) : (
          <>
            {leaderboard.map((ele, idx) => (
              <div key={idx}>
                <p>{ele.username ? ele.username : 'guest'}</p>
                <p>{ele.score}</p>
              </div>
            ))}
            <div className="lb-button-container">
              <button onClick={handlePrev}>{'<'}</button>
              <button onClick={handleNext}>{'>'}</button>
            </div>
            <p>{message}</p>
          </>
        )}
      </div>
    </Modal>
  );
}

export default LeaderboardModal;
