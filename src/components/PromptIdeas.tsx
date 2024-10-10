import React from 'react';

interface WorkflowIdea {
  title: string;
  description: string;
}

const PromptIdeas: React.FC<{ onInsertToWhiteboard: (content: string) => void }> = ({ onInsertToWhiteboard }) => {
  const workflowIdeas: WorkflowIdea[] = [
    {
      title: "Create An Area Report",
      description: "Generate a comprehensive report about a specific neighborhood or area, including market trends, demographics, and amenities."
    },
    {
      title: "Create A New Property Listing",
      description: "Craft an engaging and detailed property listing, highlighting key features and selling points."
    },
    {
      title: "Develop a Marketing Strategy",
      description: "Create a multi-channel marketing plan for a property, including social media, email, and traditional advertising methods."
    },
    {
      title: "Comparative Market Analysis",
      description: "Perform a detailed analysis comparing a property to similar ones in the area to determine its market value."
    },
    {
      title: "Investment Property Analysis",
      description: "Evaluate the potential return on investment for a property, including cash flow projections and potential appreciation."
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Prompt Ideas</h2>
      <p className="mb-4">
        Select a workflow to get started with AI-assisted content creation. Click on any idea to add it to your whiteboard:
      </p>
      {workflowIdeas.map((idea, index) => (
        <div key={index} className="mb-4 p-4 border rounded shadow-sm relative">
          <h3 className="font-bold">{idea.title}</h3>
          <p>{idea.description}</p>
          <button
            onClick={() => onInsertToWhiteboard(`Workflow: ${idea.title}\n\n${idea.description}`)}
            className="absolute bottom-2 right-2 text-gray-400 hover:text-gray-600"
            title="Send to Whiteboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default PromptIdeas;