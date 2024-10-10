export const mockMLSData = {
  "23-321859": {
    price: "$1,250,000",
    description: "Beautiful 4-bedroom, 3-bathroom home with stunning views.",
    imageUrl: "https://example.com/mock-house-image.jpg",
    address: "123 Mock Street, Mockville, MO 12345"
  }
};

export const getMockMLSData = (mlsId: string) => {
  return mockMLSData[mlsId as keyof typeof mockMLSData] || null;
};