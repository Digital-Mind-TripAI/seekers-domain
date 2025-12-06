// src/components/CometHabitat.js
import React from 'react';
import styled from 'styled-components';
import { useVortex } from '../context/VortexContext';
import { useCosmicAtlas } from '../hooks/useCosmicAtlas';

export const CometHabitat = () => {
  // 1. Ingest Global State and Logic
  const { currentComet, returnToAtlas } = useVortex();
  const { getTheme } = useCosmicAtlas();

  // Safety check: if we're here, currentComet should not be null, but good practice.
  if (!currentComet) return <div>Warp error: Destination not found.</div>; 

  const theme = getTheme(currentComet.sector);

  // --- Render the Destination UI ---
  return (
    <HabitatWrapper theme={theme}>
      <Header theme={theme}>
        <h1>{currentComet.name}</h1>
        <SectorTag style={{ backgroundColor: theme.primary }}>
          {currentComet.sector} Sector
        </SectorTag>
      </Header>

      <ContentGrid>
        <DescriptionBox>
          <p>{currentComet.description}</p>
        </DescriptionBox>

        <StatsPanel theme={theme}>
          <h2>Seeker Status</h2>
          {/* Dynamically render the stats based on metadata */}
          {Object.entries(currentComet.stats).map(([key, value]) => (
            <StatItem key={key}>
              <span>{key.toUpperCase()}:</span>
              <StatBar width={value} color={theme.secondary} />
            </StatItem>
          ))}
        </StatsPanel>

        <ActivityManifest theme={theme}>
          <h2>Activity Protocols</h2>
          {currentComet.activities.map((activity, index) => (
            <ActivityItem key={index}>
              <ActivityIcon>{activity.icon}</ActivityIcon>
              <ActivityText>{activity.name} ({activity.type})</ActivityText>
            </ActivityItem>
          ))}
        </ActivityManifest>
      </ContentGrid>
      
      {/* The essential button to exit the experience */}
      <ReturnButton onClick={returnToAtlas} theme={theme}>
        RETURN TO COSMIC ATLAS
      </ReturnButton>

    </HabitatWrapper>
  );
};

// --- STYLED COMPONENTS (The Thematic Visuals) ---

const HabitatWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 3rem;
  // Use the comet's background gradient for an immersive feel
  background: ${props => props.theme.bg}; 
  background-size: cover;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  transition: all 1s ease-in-out;
  font-family: 'Cinzel', serif;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${props => props.theme.primary};
  padding-bottom: 1rem;
  h1 {
    font-size: 3.5rem;
    text-shadow: 0 0 15px ${props => props.theme.primary}80;
    margin: 0;
  }
`;

const SectorTag = styled.span`
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  color: #111;
  font-weight: bold;
`;

// Layout for the main content areas
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "desc stats" "desc activities";
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
`;

const BasePanel = styled.div`
  background: rgba(0, 0, 0, 0.5); /* Glassy dark background */
  backdrop-filter: blur(8px);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.primary};
  }
`;

const DescriptionBox = styled(BasePanel)`
  grid-area: desc;
  p { line-height: 1.6; }
`;

const StatsPanel = styled(BasePanel)`
  grid-area: stats;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  span { font-weight: 300; font-size: 0.85rem; }
`;

const StatBar = styled.div.attrs(props => ({
  style: {
    width: `${props.width}%`,
    background: props.color,
    boxShadow: `0 0 5px ${props.color}`,
  },
}))`
  height: 8px;
  border-radius: 4px;
  max-width: 70%;
  margin-left: 10px;
  transition: width 1s ease-out;
`;

const ActivityManifest = styled(BasePanel)`
  grid-area: activities;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const ActivityIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const ActivityText = styled.span`
  font-size: 1rem;
`;

const ReturnButton = styled.button`
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 1.25rem;
  font-family: 'Cinzel', serif;
  background: none;
  border: 2px solid ${props => props.theme.primary};
  color: ${props => props.theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 0 5px ${props => props.theme.primary}80;
  &:hover {
    background: ${props => props.theme.primary}20;
    box-shadow: 0 0 25px ${props => props.theme.primary}80;
  }
`;