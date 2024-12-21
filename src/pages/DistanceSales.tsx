import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DistanceSales = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">Distance Sales Agreement</h1>
        <div className="prose">
          <p>This is your distance sales agreement content. Replace this with your actual agreement.</p>
          {/* Add your distance sales agreement content here */}
        </div>
        <div className="mt-8">
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DistanceSales;