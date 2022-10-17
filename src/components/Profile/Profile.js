import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  limitToLast,
} from 'firebase/firestore';
import { db } from '../../firebase';
// import Sidebar from '../Landing/Sidebar';

function Profile() {
  const [scoreData, setScoreData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { currentUser, userLogin } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const qu = query(
        collection(db, 'scores'),
        where('uid', '==', currentUser.uid)
      );
      const queryScores = await getDocs(qu);
      const newArr = [];
      queryScores.forEach((doc) => {
        newArr.push(doc.data().score);
      });
      setScoreData(newArr);
    };
    getUserData();
  }, []);

  function goToNextPage() {
    setCurrentPage(currentPage + 1);
  }
  function goToPreviousPage() {
    setCurrentPage(currentPage - 1);
  }
  function getPaginationData(data) {
    const startIndex = currentPage * 10 - 10;
    const endIndex = startIndex + 10;
    return data.slice(startIndex, endIndex);
  }
  let sortedData = scoreData.length ? scoreData.sort((a, b) => b - a) : null;
  let showData = scoreData.length ? getPaginationData(sortedData) : null;
  return (
    <>
      {/* <Sidebar /> */}
      <div className="profile-container">
        <h1>
          {currentUser.displayName
            ? 'Username: ' + currentUser.displayName
            : 'Guest User'}
        </h1>
        <div>
          <h3>Player Scores:</h3>
          {showData
            ? showData.map((ele) => (
                <>
                  <p>{ele}</p>
                </>
              ))
            : null}
          <div className="profile-button-container">
            <button onClick={goToPreviousPage}>{'<'}</button>
            <button onClick={goToNextPage}>{'>'}</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
