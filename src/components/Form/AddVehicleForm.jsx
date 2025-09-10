import { DateRange } from 'react-date-range'
import { TbFidgetSpinner } from 'react-icons/tb'
import { categories } from '../Categories/CategoriesData'

const AddVehicleForm = ({
    handleSubmit,
    dates,
    handleDates,
    loading = false,
    handleImageChange,
    uploadButtonText,
}) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-5xl mx-auto font-[font1] bg-white shadow-xl rounded-2xl p-8"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Section */}
                <div className="space-y-6">
                    {/* Location */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="location" className="block text-gray-700 font-medium">
                            Location
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                            name="location"
                            id="location"
                            type="text"
                            placeholder="Enter vehicle location"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="category" className="block text-gray-700 font-medium">
                            Category
                        </label>
                        <select
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                            name="category"
                        >
                            {categories.map((category) => (
                                <option value={category.label} key={category.label}>
                                    {category.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date Range */}
                    <div className="space-y-1">
                        <label className="block text-gray-700 font-medium">
                            Select Availability Range
                        </label>
                        <div className="rounded-xl overflow-hidden border border-gray-300 shadow-sm">
                            <DateRange
                                rangeColors={['#F43F5E']}
                                ranges={[dates]}
                                onChange={handleDates}
                                minDate={new Date()}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="space-y-6">
                    {/* Title */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="title" className="block text-gray-700 font-medium">
                            Title
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                            name="title"
                            id="title"
                            type="text"
                            placeholder="Enter vehicle title"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="p-4 bg-gray-50 w-full rounded-lg border border-dashed border-gray-300 text-center">
                        <label className="cursor-pointer">
                            <input
                                onChange={(e) => handleImageChange(e.target.files[0])}
                                className="hidden"
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                            />
                            <div className="inline-block bg-rose-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-rose-600 transition">
                                {uploadButtonText}
                            </div>
                        </label>
                    </div>

                    {/* Price + Guests */}
                    <div className="flex gap-4">
                        <div className="flex-1 space-y-1 text-sm">
                            <label htmlFor="price" className="block text-gray-700 font-medium">
                                Price
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                name="price"
                                id="price"
                                type="number"
                                placeholder="Enter price"
                                required
                            />
                        </div>

                        <div className="flex-1 space-y-1 text-sm">
                            <label htmlFor="guest" className="block text-gray-700 font-medium">
                                Total Guests
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                name="total_guest"
                                id="guest"
                                type="number"
                                placeholder="No. of guests"
                                required
                            />
                        </div>
                    </div>

                    {/* Seats */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="seats" className="block text-gray-700 font-medium">
                            Seats
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                            name="seats"
                            id="seats"
                            type="number"
                            placeholder="Enter number of seats"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1 text-sm">
                        <label htmlFor="description" className="block text-gray-700 font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            className="w-full h-32 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:outline-none resize-none"
                            name="description"
                            placeholder="Write something about this vehicle..."
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full p-3 mt-8 text-center font-medium text-white rounded-lg shadow-md bg-rose-500 hover:bg-rose-600 transition"
            >
                {loading ? (
                    <TbFidgetSpinner className="m-auto animate-spin" size={24} />
                ) : (
                    'Save & Continue'
                )}
            </button>
        </form>
    )
}

export default AddVehicleForm
