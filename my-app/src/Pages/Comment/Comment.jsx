import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import './Comment.css'

const Comment = () => {
  const [allComments, setAllComments] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [postOrder, setPostOrder] = useState('');
  const [nameOrder, setNameOrder] = useState('');
  const [emailOrder, setEmailOrder] = useState('');

  
  useEffect(() => {
    const savedState = localStorage.getItem('commentState');
    if (savedState) {
      const {
        pageNo: savedPageNo,
        pageSize: savedPageSize,
        searchTerm: savedSearchTerm,
        postOrder: savedPostOrder,
        nameOrder: savedNameOrder,
        emailOrder: savedEmailOrder
      } = JSON.parse(savedState);
      
      setPageNo(savedPageNo || 1);
      setPageSize(savedPageSize || 10);
      setSearchTerm(savedSearchTerm || '');
      setPostOrder(savedPostOrder || '');
      setNameOrder(savedNameOrder || '');
      setEmailOrder(savedEmailOrder || '');
    }
  }, []);

  
  useEffect(() => {
    const stateToSave = {
      pageNo,
      pageSize,
      searchTerm,
      postOrder,
      nameOrder,
      emailOrder
    };
    localStorage.setItem('commentState', JSON.stringify(stateToSave));
  }, [pageNo, pageSize, searchTerm, postOrder, nameOrder, emailOrder]);

  const filteredComments = allComments.filter(comment => {
    const term = searchTerm.toLowerCase();
    return (
      comment.postId.toString().includes(term) ||
      comment.name.toLowerCase().includes(term) ||
      comment.email.toLowerCase().includes(term) ||
      comment.body.toLowerCase().includes(term)
    );
  });

  const sortedComments = [...filteredComments].sort((a, b) => {
    if (postOrder) {
      if (postOrder === 'asc') return a.postId - b.postId;
      if (postOrder === 'desc') return b.postId - a.postId;
    }

    if (nameOrder) {
      if (nameOrder === 'asc') return a.name.localeCompare(b.name);
      if (nameOrder === 'desc') return b.name.localeCompare(a.name);
    }

    if (emailOrder) {
      if (emailOrder === 'asc') return a.email.localeCompare(b.email);
      if (emailOrder === 'desc') return b.email.localeCompare(a.email);
    }
    return 0;
  });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        
        const cachedComments = localStorage.getItem('Comments');
        if (cachedComments) {
          setAllComments(JSON.parse(cachedComments));
          return; 
        }

       
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          const data = await response.json();
          
          
          localStorage.setItem('Comments', JSON.stringify(data));
          setAllComments(data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, []);

  const commentsToDisplay = sortedComments.slice((pageNo - 1) * pageSize, pageNo * pageSize);
  const total = sortedComments.length;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <div className='sort-search-container'>
        <div className='sort-container'>
          <div className='sort-card' onClick={() => {
            setPostOrder(postOrder === 'asc' ? 'desc' : postOrder === 'desc' ? '' : 'asc');
            setNameOrder('');
            setEmailOrder('');
            setPageNo(1);
          }}>
            <p>Sort Post ID </p>
            <div className='sort-icon-container'>
              <FaCaretUp className={`${postOrder === 'asc' && 'sort-active'} sort-icon`} />
              <FaCaretDown className={`${postOrder === 'desc' && 'sort-active'} sort-icon`} />
            </div>
          </div>
          <div className='sort-card' onClick={() => {
            setNameOrder(nameOrder === 'asc' ? 'desc' : nameOrder === 'desc' ? '' : 'asc');
            setPostOrder('');
            setEmailOrder('');
            setPageNo(1);
          }}>
            <p>Sort Name</p>
            <div className='sort-icon-container'>
              <FaCaretUp className={`${nameOrder === 'asc' && 'sort-active'} sort-icon`} />
              <FaCaretDown className={`${nameOrder === 'desc' && 'sort-active'} sort-icon`} />
            </div>
          </div>
          <div className='sort-card' onClick={() => {
            setEmailOrder(emailOrder === 'asc' ? 'desc' : emailOrder === 'desc' ? '' : 'asc');
            setPostOrder('');
            setNameOrder('');
            setPageNo(1);
          }}>
            <p>Sort Email</p>
            <div className='sort-icon-container'>
              <FaCaretUp className={`${emailOrder === 'asc' && 'sort-active'} sort-icon`} />
              <FaCaretDown className={`${emailOrder === 'desc' && 'sort-active'} sort-icon`} />
            </div>
          </div>
        </div>
        <div className='search-container'>
          <IoIosSearch className='search-icon' />
          <input 
            type="search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search email, name , comment' 
            className='search-inputs' 
          />
        </div>
      </div>
      <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {commentsToDisplay.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.postId}</td>
                <td>{comment.name}</td>
                <td style={{cursor: 'pointer', color: 'blue'}}>{comment.email}</td>
                <td>{comment.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mobile-table'>
        {commentsToDisplay.map((comment) => (
          <div key={comment.id} className='each-table-card'>
            <div className='info-part'>
              <div className='table-content'>
                <h2>Post ID</h2>
                <p>{comment.postId}</p>
              </div>
              <div className='table-name-email'>
                <div className='table-content'>
                  <h2>Name</h2>
                  <p>{comment.name}</p>
                </div>
                <div className='table-content'>
                  <h2>Email</h2>
                  <p>{comment.email}</p>
                </div>
              </div>
            </div>
            <div className='comment-part'>
              <h2>Comment</h2>
              <p>{comment.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='pagination-container'>
        <p className='total-pages'>
          {total === 0 ? '0' : `${(pageNo - 1) * pageSize + 1}-${Math.min(pageNo * pageSize, total)} of ${total} items`}
        </p>
        <div className='pagination-btn'>
          <GrFormPrevious
            className={`pagination-icon${pageNo === 1 ? ' disabled' : ''}`}
            onClick={() => pageNo > 1 && setPageNo(pageNo - 1)}
            style={{ cursor: pageNo === 1 ? 'not-allowed' : 'pointer', opacity: pageNo === 1 ? 0.5 : 1 }}
          />
          {(() => {
            let start = Math.max(1, pageNo - 1);
            let end = Math.min(totalPages, start + 1);
            if (end === totalPages && totalPages > 1) start = totalPages - 1;
            if (start < 1) start = 1;
            const pages = [];
            for (let i = start; i <= end; i++) {
              pages.push(
                <p
                  key={i}
                  className={`pagination-text${pageNo === i ? ' active' : ''}`}
                  onClick={() => setPageNo(i)}
                  style={{ cursor: 'pointer' }}
                >
                  {i}
                </p>
              );
            }
            return pages;
          })()}
          <GrFormNext
            className={`pagination-icon${pageNo === totalPages || totalPages === 0 ? ' disabled' : ''}`}
            onClick={() => pageNo < totalPages && setPageNo(pageNo + 1)}
            style={{ cursor: pageNo === totalPages || totalPages === 0 ? 'not-allowed' : 'pointer', opacity: pageNo === totalPages || totalPages === 0 ? 0.5 : 1 }}
          />
        </div>
        <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPageNo(1); }}>
          <option value="10">10 pages</option>
          <option value="50">50 pages</option>
          <option value="100">100 pages</option>
        </select>
      </div>
    </div>
  )
}

export default Comment