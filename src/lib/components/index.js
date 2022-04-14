import React from 'react';
import LandingSection from './Landing';
import ProviderSection, { layouterContext as layouterContextBuffer } from './Provider';
import BodySection from './Body';

export const layouterContext = layouterContextBuffer;
export const Landing = LandingSection;
export const Provider = ProviderSection;
export const Body = BodySection;
