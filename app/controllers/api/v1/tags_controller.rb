class Api::V1::TagsController < ApplicationController
    # GET /api/v1/tags
    def index
        # Most popular tags at the top.
        # If same tagging count, sort alphabetically in ascending order
        render json: ActsAsTaggableOn::Tag.all.order(taggings_count: :desc, name: :asc)
    end
end
