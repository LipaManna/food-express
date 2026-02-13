export const MenuCard = ({ item, addToCart }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <img src={item.image} className="rounded mb-3" />
      <h3 className="font-bold">{item.name}</h3>
      <p className="text-sm text-gray-600">{item.description}</p>
      <p className="font-semibold mt-2">₹{item.price}</p>
      <button
        onClick={() => addToCart(item)}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};
