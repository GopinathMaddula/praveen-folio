import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import praveenLogo from '../../assets/logo-thunderstorm-96.d1126ac.svg fill.svg';
import './Header.css';
import ResourceModal from '../ResourceModal/ResourceModal';
import CaseStudiesModal from '../CaseStudiesModal/CaseStudiesModal';

const Header: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isResourceModalVisible, setIsResourceModalVisible] = useState(false);
  const [activeLink, setActiveLink] = useState<string>(
    window.location.pathname
  );
  const caseStudiesRef = useRef<HTMLLIElement>(null);
  const resourcesRef = useRef<HTMLLIElement>(null);
  // Handle regular link clicks
  const handleLinkClick = (path: string) => {
    setIsModalVisible(false);
    setIsResourceModalVisible(false);
    setActiveLink(path);
  };

  // Update all dropdown/hover handlers
  const handleCaseStudiesHover = () => {
    setIsResourceModalVisible(false);
    setIsModalVisible(true);
    setActiveLink('#case-studies');
  };

  const handleResourceHover = () => {
    setIsModalVisible(false);
    setIsResourceModalVisible(true);
    setActiveLink('#resource');
  };

  const handleMouseLeave = () => {
    // Add a small delay to prevent the dropdown from closing immediately
    // This makes the interaction feel smoother when moving between the link and dropdown
    setTimeout(() => {
      if (!document.querySelector('.case-studies-modal:hover')) {
        setIsModalVisible(false);
        setIsResourceModalVisible(false);
        setActiveLink(window.location.pathname);
      }
    }, 100);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        caseStudiesRef.current &&
        !caseStudiesRef.current.contains(event.target as Node) &&
        !document
          .querySelector('.case-studies-modal')
          ?.contains(event.target as Node)
      ) {
        setIsModalVisible(false);
      }
      if (
        resourcesRef.current &&
        !resourcesRef.current.contains(event.target as Node) &&
        !document
          .querySelector('.case-studies-modal')
          ?.contains(event.target as Node)
      ) {
        setIsResourceModalVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className={`header ${
          (activeLink === '#case-studies' || activeLink === '#resource') &&
          (isModalVisible || isResourceModalVisible)
            ? 'white-bg'
            : ''
        }`}
      >
        <div className='header-left'>
          <Link to='/' onClick={() => handleLinkClick('/')}>
            <img src={praveenLogo} alt='Praveen Manchi' />
          </Link>
        </div>
        <nav className='header-right'>
          <ul>
            <li>
              <Link
                to='/about-me'
                className={activeLink === '/about-me' ? 'active' : ''}
                onClick={() => handleLinkClick('/about-me')}
              >
                ABOUT ME
              </Link>
            </li>
            <li
              ref={caseStudiesRef}
              onMouseEnter={handleCaseStudiesHover}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to='#'
                className={activeLink === '#case-studies' ? 'active' : ''}
              >
                Case Studies
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className={activeLink === '/contact' ? 'active' : ''}
                onClick={() => handleLinkClick('/contact')}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to='/blog'
                className={activeLink === '/blog' ? 'active' : ''}
                onClick={() => handleLinkClick('/blog')}
              >
                Blog
              </Link>
            </li>
            <li
              ref={resourcesRef}
              onMouseEnter={handleResourceHover}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to='#'
                className={activeLink === '#resource' ? 'active' : ''}
              >
                Resource
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {isModalVisible && (
        <div
          className='case-studies-modal'
          onMouseEnter={() => setIsModalVisible(true)}
          onMouseLeave={() => {
            setIsModalVisible(false);
            setActiveLink(window.location.pathname);
          }}
        >
          <CaseStudiesModal setIsModalVisible={setIsModalVisible} />
        </div>
      )}
      {isResourceModalVisible && (
        <div
          className='case-studies-modal'
          onMouseEnter={() => setIsResourceModalVisible(true)}
          onMouseLeave={() => {
            setIsResourceModalVisible(false);
            setActiveLink(window.location.pathname);
          }}
        >
          <ResourceModal />
        </div>
      )}
    </>
  );
};

export default Header;
